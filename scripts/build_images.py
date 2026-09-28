"""Attach the per-pattern tire photos to the flipbook brochures.

Reads the photo folders listed in scripts/brochure_images.json, works out which
brochure page shows which pattern, and writes:

  public/brochures/<owner>/images/<pattern>/<view>.png         original, byte for byte
  public/brochures/<owner>/images/<pattern>/<view>.webp        1280px, for the viewer
  public/brochures/<owner>/images/<pattern>/<view>.thumb.webp  400px, for the gallery
  public/brochures/<id>/images.json                            what the Flipbook reads

<owner> is the brochure whose `source` folder a photo came from; a brochure
that borrows another's photos points at the owner's copies instead of storing
its own.

The ZIP of a brochure's originals is not kept in git. images.json lists what
goes in it, and scripts/pack_images.js writes it after `npm run build` (or into
public/ for local testing: `node scripts/pack_images.js public`).

A page is matched by its title -- the largest type on it, e.g. "SU05" set at
65pt -- against the pattern folder names. Folders that differ only by a suffix
("P3036" / "P3036 RUN FLAT", "SU05" / "SU05 LG ASSEMBLY KIT") are told apart by
whether the suffix words appear on the page. Anything this gets wrong goes in
the brochure's "pages" override in brochure_images.json.

    python scripts/build_images.py                 # every brochure in the config
    python scripts/build_images.py hirun-st        # just these
    python scripts/build_images.py --review        # also write page-vs-photo contact
                                                   # sheets to _inbox/review/

Requires PyMuPDF and Pillow.
"""

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageDraw

from build_brochure import BROCHURE_DIR, ROOT, regenerate_registry

CONFIG = ROOT / "scripts" / "brochure_images.json"
REVIEW_DIR = ROOT / "_inbox" / "review"

VIEW_MAX = 1280
THUMB_MAX = 400
WEBP_QUALITY = 82
PHOTO_EXT = {".png", ".jpg", ".jpeg"}
LOGO_EXT = {".png", ".svg", ".jpg", ".jpeg"}

# Suffix words in folder names, spelled the way the brochure pages spell them.
ALIASES = {"LG": "LAWN GARDEN", "WB": "WHEELBARROW"}

fitz.TOOLS.mupdf_display_errors(False)


def norm(text):
    return re.sub(r"[^A-Z0-9]", "", text.upper())


def slug(text):
    text = text.replace("°", "deg").lower()
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def natural(text):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", text)]


def url_of(path):
    return "/" + path.relative_to(ROOT / "public").as_posix()


def is_logo(path):
    return "LOGO" in path.stem.upper()


# --------------------------------------------------------------------------
# Photos


def view_label(stem, folder):
    """'CT921 A' in CT921 -> 'A'; 'CAVALRY MT_0°' in AETHON MT -> '0°'."""
    s = stem.strip()
    for prefix in (folder, folder.split(" ")[0]):
        if norm(s).startswith(norm(prefix)):
            # Walk forward until the normalized prefix is used up, so
            # separators inside the prefix ("4x4 HP" vs "4X4 HP") don't matter.
            want, i = norm(prefix), 0
            while want and i < len(s):
                if re.match(r"[A-Za-z0-9]", s[i]):
                    want = want[1:]
                i += 1
            return s[i:].strip(" _-")
    tail = re.split(r"[ _-]", s)[-1]
    return tail if len(tail) <= 4 else s


def publish_view(src, dest_dir):
    """Copy one photo in and render its WebPs; skip work that is up to date."""
    base = dest_dir / slug(src.stem)
    original = base.with_suffix(src.suffix.lower())
    view = Path(f"{base}.webp")
    thumb = Path(f"{base}.thumb.webp")
    fresh = all(p.is_file() and p.stat().st_mtime >= src.stat().st_mtime for p in (original, view, thumb))

    if not fresh:
        shutil.copyfile(src, original)
        img = Image.open(src)
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        big = img.copy()
        big.thumbnail((VIEW_MAX, VIEW_MAX), Image.LANCZOS)
        big.save(view, "WEBP", quality=WEBP_QUALITY, method=4)
        small = img.copy()
        small.thumbnail((THUMB_MAX, THUMB_MAX), Image.LANCZOS)
        small.save(thumb, "WEBP", quality=WEBP_QUALITY, method=4)

    with Image.open(original) as im:
        w, h = im.size
    return {
        "src": url_of(view),
        "thumb": url_of(thumb),
        "original": url_of(original),
        "filename": src.name,
        "w": w,
        "h": h,
        "bytes": original.stat().st_size,
    }


def publish_folder(folder_dir, owner, excluded):
    """Publish every pattern subfolder of one source folder under its owner."""
    out_root = BROCHURE_DIR / owner / "images"
    patterns, keep = [], set()
    for pdir in sorted((p for p in folder_dir.iterdir() if p.is_dir()), key=lambda p: natural(p.name)):
        if f"{folder_dir.name}/{pdir.name}" in excluded:
            print(f"  skip {pdir.name}: excluded")
            continue
        photos = [f for f in pdir.iterdir() if f.suffix.lower() in PHOTO_EXT]
        if not photos:
            continue
        pid = slug(pdir.name)
        dest = out_root / pid
        dest.mkdir(parents=True, exist_ok=True)
        keep.add(pid)

        views = []
        for f in photos:
            v = publish_view(f, dest)
            v["label"] = view_label(f.stem, pdir.name)
            views.append(v)
        # Unlabelled first, then by series: A B C before Assembly A B C.
        views.sort(key=lambda v: (v["label"] != "", natural(v["label"].rpartition(" ")[0]),
                                  natural(v["label"].rpartition(" ")[2])))
        # Drop derivatives of photos that have since been removed or renamed.
        wanted = {Path(v[k]).name for v in views for k in ("src", "thumb", "original")}
        for stale in dest.iterdir():
            if stale.name not in wanted:
                stale.unlink()

        patterns.append({"id": pid, "label": pdir.name, "folder": folder_dir.name, "owner": owner, "views": views})
        print(f"  {pdir.name:26s} {len(views)} view(s)")

    if out_root.is_dir():
        for stale in out_root.iterdir():
            if stale.is_dir() and stale.name not in keep and stale.name != "_logo":
                shutil.rmtree(stale)
    return patterns


def cover_view(views):
    """The view to lead with: the first that isn't a head-on tread shot.

    A 0° photo looks straight at the tread and is a narrow strip, which makes a
    poor thumbnail; the 3/4 and side views are all at least half as wide as tall.
    """
    return next((i for i, v in enumerate(views) if v["w"] / v["h"] >= 0.5), 0)


def publish_logos(folder_dir, owner):
    files = sorted(f for f in folder_dir.iterdir() if f.is_file() and f.suffix.lower() in LOGO_EXT and is_logo(f))
    if not files:
        return []
    dest = BROCHURE_DIR / owner / "images" / "_logo"
    dest.mkdir(parents=True, exist_ok=True)
    out = []
    for f in files:
        target = dest / f.name
        if not target.is_file() or target.stat().st_mtime < f.stat().st_mtime:
            shutil.copyfile(f, target)
        out.append({"filename": f.name, "original": url_of(target), "bytes": target.stat().st_size})
    return out


# --------------------------------------------------------------------------
# Pages


def page_title(page):
    """The page's largest type, joined in reading order; '' if under 24pt."""
    spans = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for s in line["spans"]:
                if s["text"].strip():
                    spans.append(s)
    if not spans:
        return ""
    top = max(s["size"] for s in spans)
    if top < 24:
        return ""
    big = sorted((s for s in spans if s["size"] >= top * 0.95), key=lambda s: s["bbox"][1])
    # Group into lines by vertical overlap before reading left to right: a
    # title split into spans ("T" + "210") needn't share a baseline exactly.
    lines = []
    for s in big:
        y0, y1 = s["bbox"][1], s["bbox"][3]
        line = next((l for l in lines if min(y1, l["y1"]) - max(y0, l["y0"]) > (y1 - y0) / 2), None)
        if line:
            line["spans"].append(s)
        else:
            lines.append({"y0": y0, "y1": y1, "spans": [s]})
    # Outlined display type is often set twice -- a stroke copy under the
    # fill -- so drop repeats.
    parts = []
    for line in lines:
        for s in sorted(line["spans"], key=lambda s: s["bbox"][0]):
            if s["text"].strip() not in parts:
                parts.append(s["text"].strip())
    return " ".join(parts)


def suffix_words(label):
    words = label.split(" ")[1:]
    return [w for word in words for w in ALIASES.get(word.upper(), word).split(" ")]


def match_page(page, patterns):
    """Pick the pattern shown on a page, or None. Returns (pattern, how)."""
    title = norm(page_title(page))
    text = norm(page.get_text())
    if title:
        exact = [p for p in patterns if norm(p["label"]) == title]
        variants = [p for p in patterns if norm(p["label"].split(" ")[0]) == title and p not in exact]
        family = exact + variants
        if not family:
            # Titles are sometimes cut short ("CAVALRY 4X4 H"); accept a
            # prefix only when it points at exactly one folder.
            family = [p for p in patterns if norm(p["label"]).startswith(title)]
            if len(family) > 1:
                family = []
        if not family:
            return None, None  # a titled page for a pattern we have no photos of
        # Prefer the variant whose suffix words all appear on the page, the
        # longer suffix winning; otherwise the plain pattern.
        scored = [p for p in family if all(norm(w) in text for w in suffix_words(p["label"]))]
        if scored:
            return max(scored, key=lambda p: len(suffix_words(p["label"]))), "title"
        plain = [p for p in family if not suffix_words(p["label"])]
        return (plain[0] if plain else family[0]), "title"

    # No usable title (e.g. it was converted to outlines): fall back to the one
    # pattern whose full name appears in the page text.
    hits = [p for p in patterns if len(norm(p["label"])) >= 4 and norm(p["label"]) in text]
    hits = [p for p in hits if not any(q is not p and norm(p["label"]) in norm(q["label"]) for q in hits)]
    if len(hits) == 1:
        return hits[0], "text"
    return None, None


def photo_rect(page):
    """Where the tire photo sits, as % of the page, or None.

    Tire photos are placed as upright-ish images covering 1-35% of the page;
    backgrounds are wider or larger, logos flatter. Brochures usually show the
    same photo twice side by side, so images of identical pixel size are
    grouped and the group covering the most page wins.

    Text panels and drop shadows are images too. They are grayscale (masks)
    or low resolution (a blurred panel at ~1 px/pt against ~2 for photos), so
    they only count when nothing else on the page qualifies.
    """
    pw, ph = page.rect.width, page.rect.height
    photos, others = {}, {}
    for info in page.get_image_info(xrefs=True):
        r = fitz.Rect(info["bbox"]) & page.rect
        if r.is_empty or not info["width"]:
            continue
        area = r.width * r.height / (pw * ph)
        if not (0.01 <= area <= 0.35 and info["height"] / info["width"] >= 0.75):
            continue
        gray = "Gray" in str(info.get("cs-name", ""))
        blurry = info["width"] / r.width < 1.5
        groups = others if gray or blurry else photos
        dims = (info["width"], info["height"])
        groups[dims] = groups[dims] | r if dims in groups else fitz.Rect(r)
    groups = photos or others
    if not groups:
        return None
    rect = max(groups.values(), key=lambda r: r.width * r.height)
    return {
        "x": round(rect.x0 / pw * 100, 1),
        "y": round(rect.y0 / ph * 100, 1),
        "w": round(rect.width / pw * 100, 1),
        "h": round(rect.height / ph * 100, 1),
    }


# --------------------------------------------------------------------------
# ZIP


def zip_plan(title, patterns, logos):
    """Entries for pack_images.js, plus the exact size of the stored ZIP."""
    top = re.sub(r"\s*/\s*", "-", title).strip() + " Images"
    entries = []
    for p in patterns:
        for v in p["views"]:
            entries.append({"path": f"{top}/{p['label']}/{v['filename']}", "src": v["original"], "bytes": v["bytes"]})
    for logo in logos:
        entries.append({"path": f"{top}/Logo/{logo['filename']}", "src": logo["original"], "bytes": logo["bytes"]})
    # Stored (no compression -- PNGs don't shrink), no extra fields:
    # 30-byte local header + name + data, 46-byte central entry + name, 22-byte end record.
    size = 22 + sum(76 + 2 * len(e["path"].encode("utf-8")) + e["bytes"] for e in entries)
    return top, entries, size


# --------------------------------------------------------------------------
# Review


def review_sheet(bid, doc, hotspots, by_id, dest):
    rows = []
    for page_no, spot in sorted(hotspots.items(), key=lambda kv: int(kv[0])):
        page = doc[int(page_no) - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        r = spot.get("rect")
        if r:
            W, H = img.size
            img = img.crop((int(W * r["x"] / 100), int(H * r["y"] / 100),
                            int(W * (r["x"] + r["w"]) / 100), int(H * (r["y"] + r["h"]) / 100)))
        pattern = by_id[spot["pattern"]]
        photo_path = ROOT / "public" / pattern["views"][pattern["cover"]]["thumb"].lstrip("/")
        photo = Image.open(photo_path).convert("RGBA")
        flat = Image.new("RGB", photo.size, (255, 255, 255))
        flat.paste(photo, mask=photo.split()[-1])
        rows.append((page_no, pattern["label"], img, flat))

    if not rows:
        return None
    H = 260
    fit = lambda im: im.resize((max(1, round(im.width * H / im.height)), H))
    tiles = [(n, label, fit(a), fit(b)) for n, label, a, b in rows]
    cols = 3
    cell_w = max(a.width + b.width for _, _, a, b in tiles) + 30
    sheet = Image.new("RGB", (cell_w * cols, (H + 34) * ((len(tiles) + cols - 1) // cols)), (235, 235, 235))
    draw = ImageDraw.Draw(sheet)
    for i, (n, label, a, b) in enumerate(tiles):
        x, y = (i % cols) * cell_w + 10, (i // cols) * (H + 34) + 6
        draw.text((x, y), f"p.{n}  ->  {label}", fill=(0, 0, 0))
        sheet.paste(a, (x, y + 20))
        sheet.paste(b, (x + a.width + 8, y + 20))
    dest.mkdir(parents=True, exist_ok=True)
    out = dest / f"{bid}.jpg"
    sheet.save(out, "JPEG", quality=82)
    return out


# --------------------------------------------------------------------------


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("ids", nargs="*", help="brochure ids (default: all in the config)")
    parser.add_argument("--review", action="store_true", help="write contact sheets to _inbox/review/")
    args = parser.parse_args()

    cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
    root = Path(cfg["root"])
    brochures = cfg["brochures"]
    excluded = set(cfg.get("exclude", {}))
    owner_of = {b["source"]: bid for bid, b in brochures.items()}
    wanted = args.ids or list(brochures)
    for bid in wanted:
        if bid not in brochures:
            sys.exit(f"{bid}: not in {CONFIG.name}")

    # Publish every folder a wanted brochure reads from, once, under its owner.
    folders = {}
    for bid in wanted:
        b = brochures[bid]
        for name in [b["source"], *b.get("borrow", [])]:
            folders.setdefault(name, None)
    for name in folders:
        owner = owner_of.get(name)
        if not owner:
            sys.exit(f"{name}: borrowed but no brochure lists it as its source")
        print(f"{name} -> {owner}")
        folders[name] = publish_folder(root / name, owner, excluded)

    problems = []
    for bid in wanted:
        b = brochures[bid]
        meta_path = BROCHURE_DIR / bid / "meta.json"
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        own = folders[b["source"]]
        borrowed = [p for name in b.get("borrow", []) for p in folders[name]]
        pool = own + borrowed
        by_label = {p["label"]: p for p in pool}
        overrides = b.get("pages", {})

        doc = fitz.open(BROCHURE_DIR / bid / "source.pdf")
        pages, hotspots, report = {}, {}, []
        for i, page in enumerate(doc, start=1):
            if str(i) in overrides:
                label = overrides[str(i)]
                if label is not None and label not in by_label:
                    sys.exit(f"{bid} p.{i}: override names unknown pattern {label!r}")
                pattern, how = (by_label[label], "override") if label else (None, "override")
            else:
                pattern, how = match_page(page, pool)
            if pattern:
                pages.setdefault(pattern["label"], []).append(i)
                hotspots[str(i)] = {"pattern": pattern["id"], "rect": photo_rect(page)}
            title = page_title(page)
            report.append(f"    p.{i:<3d} {title[:30]:30s} -> {pattern['label'] if pattern else '-'}"
                          + (f"  ({how})" if how and how != "title" else ""))
            if not pattern and not how and len(norm(title)) >= 3 and 1 < i < doc.page_count:
                problems.append(f"{bid} p.{i}: titled {title!r} but no photos matched")

        used = own + [p for p in borrowed if p["label"] in pages]
        ids = [p["id"] for p in used]
        if len(ids) != len(set(ids)):
            sys.exit(f"{bid}: two patterns share an id: {ids}")
        used.sort(key=lambda p: (min(pages.get(p["label"], [10_000])), natural(p["label"])))

        logos = []
        for name in b.get("logos", [b["source"]]):
            logos += publish_logos(root / name, owner_of[name])

        patterns = [
            {
                "id": p["id"],
                "label": p["label"],
                "pages": pages.get(p["label"], []),
                "cover": cover_view(p["views"]),
                "views": p["views"],
            }
            for p in used
        ]
        top, entries, size = zip_plan(meta["title"], patterns, logos)
        manifest = {
            "zip": {
                "url": f"/brochures/{bid}/{bid}-images.zip",
                "filename": f"{top}.zip",
                "bytes": size,
                "entries": entries,
            },
            "patterns": patterns,
            "hotspots": hotspots,
        }
        (BROCHURE_DIR / bid / "images.json").write_text(
            json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        meta["images"] = True
        meta_path.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        views = sum(len(p["views"]) for p in patterns)
        print(f"\n{bid}: {len(patterns)} patterns, {views} photos, {len(hotspots)}/{doc.page_count} pages, "
              f"ZIP {size / 1e6:.1f} MB")
        print("\n".join(report))
        for p in patterns:
            if not p["pages"]:
                problems.append(f"{bid}: {p['label']} is on no page (gallery only)")

        if args.review:
            out = review_sheet(bid, doc, hotspots, {p["id"]: p for p in patterns}, REVIEW_DIR)
            if out:
                print(f"  review sheet -> {out.relative_to(ROOT)}")

    regenerate_registry()
    if problems:
        print("\nNeeds a look:")
        print("\n".join(f"  {p}" for p in problems))


if __name__ == "__main__":
    main()
