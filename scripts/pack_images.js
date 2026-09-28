/**
 * Post-build step: pack each brochure's original photos into one ZIP.
 *
 * scripts/build_images.py writes public/brochures/<id>/images.json, whose
 * zip.entries list every original photo (and the brand logos) with the path it
 * should have inside the archive. This writes those files, uncompressed, to
 * brochures/<id>/<id>-images.zip -- PNGs don't shrink, so storing them keeps
 * the size exact and the pack fast.
 *
 * The ZIPs are build output rather than source: committing them would put
 * every photo in git twice.
 *
 *   node scripts/pack_images.js          # into build/ -- what postbuild runs
 *   node scripts/pack_images.js public   # into public/, for `npm start`; gitignored
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, process.argv[2] || "build");

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function dosDateTime(d) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { time, date };
}

const UTF8_NAMES = 0x0800; // general-purpose flag bit 11: names are UTF-8 ("0°.png")

function writeZip(dest, entries) {
  const fd = fs.openSync(dest, "w");
  const { time, date } = dosDateTime(new Date());
  const central = [];
  let offset = 0;

  for (const entry of entries) {
    const data = fs.readFileSync(path.join(OUT, entry.src));
    const name = Buffer.from(entry.path, "utf8");
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(UTF8_NAMES, 6);
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28); // extra length
    fs.writeSync(fd, local);
    fs.writeSync(fd, name);
    fs.writeSync(fd, data);

    const head = Buffer.alloc(46);
    head.writeUInt32LE(0x02014b50, 0);
    head.writeUInt16LE(20, 4); // made by
    head.writeUInt16LE(20, 6); // version needed
    head.writeUInt16LE(UTF8_NAMES, 8);
    head.writeUInt16LE(0, 10);
    head.writeUInt16LE(time, 12);
    head.writeUInt16LE(date, 14);
    head.writeUInt32LE(crc, 16);
    head.writeUInt32LE(data.length, 20);
    head.writeUInt32LE(data.length, 24);
    head.writeUInt16LE(name.length, 28);
    // extra, comment, disk, internal attrs, external attrs: all zero
    head.writeUInt32LE(offset, 42);
    central.push(head, name);

    offset += local.length + name.length + data.length;
  }

  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  fs.writeSync(fd, dir);
  fs.writeSync(fd, end);
  fs.closeSync(fd);
  return offset + dir.length + end.length;
}

function main() {
  const dir = path.join(OUT, "brochures");
  if (!fs.existsSync(dir)) {
    console.error(`pack_images: ${dir} does not exist -- run the build first`);
    process.exit(1);
  }

  let count = 0;
  let total = 0;
  for (const id of fs.readdirSync(dir).sort()) {
    const manifest = path.join(dir, id, "images.json");
    if (!fs.existsSync(manifest)) continue;
    const { zip } = JSON.parse(fs.readFileSync(manifest, "utf8"));
    const dest = path.join(OUT, zip.url);
    const size = writeZip(dest, zip.entries);
    if (size !== zip.bytes) {
      // The viewer shows zip.bytes as the download size, so a mismatch only
      // makes that label wrong -- not worth failing a deploy over. It means
      // build_images.py's size formula and this writer have drifted apart,
      // or a file changed after build_images.py ran.
      console.warn(`pack_images: ${id} is ${size} bytes, images.json says ${zip.bytes}`);
    }
    count += 1;
    total += size;
  }
  console.log(`pack_images: ${count} ZIPs, ${(total / 1e6).toFixed(0)} MB`);
}

main();
