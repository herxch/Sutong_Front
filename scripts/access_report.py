"""Who is reading the brochures and warranties, from CloudFront access logs.

No tracking code, no cookies, no third party: Amplify already keeps the access
logs, so this asks for them after the fact and counts what it finds.

    python scripts/access_report.py --days 7

Needs `aws login` first (see the AWS notes in the project memory).

Two things worth knowing about the numbers it prints:

* A brochure's source.pdf is only ever fetched when someone clicks the download
  button, so those counts are real downloads. A warranty PDF is embedded with
  <object> and loads with the page, so its count is really a page view.
* Page images load as the reader flips, so the highest page-NN.webp an address
  asked for is roughly how far they read. The browser caches them, so a second
  visit adds nothing -- treat depth as a floor, not an exact figure.
"""

import argparse
import collections
import csv
import io
import json
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

APP_ID = "d1l21v65f6j4oi"
DOMAIN = "sutongctr.com"
REGION = "us-east-2"

CACHE = Path(__file__).resolve().parent.parent / ".access-logs"

# Anything that announces itself as automation, plus the scanners that probe for
# PHP and WordPress. Those matter here because the SPA rewrite answers every
# unknown path with 200 + index.html, so a scanner otherwise looks like a reader.
BOT = re.compile(
    r"bot|crawl|spider|slurp|headless|python|curl|wget|scan|autodiscover|Office/",
    re.I,
)
JUNK_PATH = re.compile(r"\.php|wp-json|wp-admin|wp-includes|/\.env|/\.git", re.I)

BROCHURE_PAGE = re.compile(r"^/brochures/([^/]+)/page-(\d+)\.webp$")
BROCHURE_PDF = re.compile(r"^/brochures/([^/]+)/source\.pdf$")
WARRANTY_PDF = re.compile(r"^/warranty/([^/]+)\.pdf$")
# The id may not contain a dot, or these swallow the PDF paths above -- they are
# tested first, and /warranty/cavalry-mtr.pdf would book as a page view.
BROCHURE_VIEW = re.compile(r"^/brochures/([^/.]+)/?$")
WARRANTY_VIEW = re.compile(r"^/warranty/([^/.]+)/?$")


def aws(*args):
    out = subprocess.run(
        ["aws", *args], capture_output=True, text=True, shell=False
    )
    if out.returncode:
        raise RuntimeError(out.stderr.strip())
    return out.stdout


def fetch_window(start, end):
    """One log window as CSV text. Amplify refuses ranges it considers too big,
    so callers narrow until it agrees."""
    fmt = "%Y-%m-%dT%H:%M:%SZ"
    raw = aws(
        "amplify",
        "generate-access-logs",
        "--app-id",
        APP_ID,
        "--domain-name",
        DOMAIN,
        "--region",
        REGION,
        "--start-time",
        start.strftime(fmt),
        "--end-time",
        end.strftime(fmt),
        "--output",
        "json",
    )
    url = json.loads(raw)["logUrl"]
    with urllib.request.urlopen(url, timeout=120) as r:
        return r.read().decode("utf8", "replace")


def load_day(day):
    """A calendar day of log rows, cached on disk so re-runs are free."""
    CACHE.mkdir(exist_ok=True)
    cached = CACHE / f"{day:%Y-%m-%d}.csv"
    if cached.is_file():
        return cached.read_text(encoding="utf8")

    start = datetime(day.year, day.month, day.day, tzinfo=timezone.utc)
    windows = [(start, start + timedelta(days=1))]
    chunks = []
    while windows:
        a, b = windows.pop(0)
        try:
            chunks.append(fetch_window(a, b))
        except RuntimeError as e:
            if "reduce time range" not in str(e) or (b - a) < timedelta(minutes=15):
                raise
            mid = a + (b - a) / 2
            windows[:0] = [(a, mid), (mid, b)]

    # Keep one header, drop the rest.
    text = chunks[0]
    for extra in chunks[1:]:
        text += "\n".join(extra.splitlines()[1:]) + "\n"
    cached.write_text(text, encoding="utf8")
    return text


def rows_for(days):
    today = datetime.now(timezone.utc).date()
    for n in range(days, 0, -1):
        day = today - timedelta(days=n - 1)
        try:
            text = load_day(day)
        except RuntimeError as e:
            print(f"  ({day}: {e})", file=sys.stderr)
            continue
        reader = csv.DictReader(io.StringIO(text))
        for row in reader:
            yield row


def col(row, fragment):
    for k in row:
        if fragment in k:
            return row[k]
    return ""


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--days", type=int, default=7, help="how many days back")
    args = ap.parse_args()

    views = collections.Counter()          # brochure id -> requests
    view_ips = collections.defaultdict(set)
    depth = {}                             # (ip, id) -> furthest page
    downloads = collections.Counter()
    wviews = collections.Counter()
    wview_ips = collections.defaultdict(set)
    wpdf = collections.Counter()
    catalog = set()
    total = kept = 0

    for row in rows_for(args.days):
        total += 1
        ua = urllib.parse.unquote(col(row, "User-Agent"))
        path = urllib.parse.unquote(row.get("cs-uri-stem", ""))
        if BOT.search(ua) or JUNK_PATH.search(path):
            continue
        if row.get("cs-method") != "GET" or not row.get("sc-status", "").startswith(
            ("2", "3")
        ):
            continue
        kept += 1
        ip = row.get("c-ip", "")

        if m := BROCHURE_VIEW.match(path):
            views[m.group(1)] += 1
            view_ips[m.group(1)].add(ip)
        elif m := BROCHURE_PAGE.match(path):
            k = (ip, m.group(1))
            depth[k] = max(depth.get(k, 0), int(m.group(2)))
        elif m := BROCHURE_PDF.match(path):
            downloads[m.group(1)] += 1
        elif m := WARRANTY_VIEW.match(path):
            wviews[m.group(1)] += 1
            wview_ips[m.group(1)].add(ip)
        elif m := WARRANTY_PDF.match(path):
            wpdf[m.group(1)] += 1
        elif path in ("/catalog", "/catalog/"):
            catalog.add(ip)

    print(f"\nlast {args.days} day(s): {total} log rows, {kept} after dropping bots\n")
    print(f"catalog page reached by {len(catalog)} distinct addresses\n")

    ids = sorted(set(views) | set(downloads) | {i for _, i in depth})
    if ids:
        print("BROCHURES")
        print(f"  {'brochure':22} {'opens':>6} {'people':>7} {'read to':>8} {'PDF dl':>7}")
        for bid in sorted(ids, key=lambda i: -views[i]):
            reached = [p for (_, i), p in depth.items() if i == bid]
            deepest = f"p{max(reached)}" if reached else "-"
            print(
                f"  {bid:22} {views[bid]:>6} {len(view_ips[bid]):>7} "
                f"{deepest:>8} {downloads[bid]:>7}"
            )
    else:
        print("BROCHURES: no traffic yet")

    print()
    wids = sorted(set(wviews) | set(wpdf))
    if wids:
        print("WARRANTIES  (PDF loads with the page, so it tracks opens)")
        print(f"  {'document':22} {'opens':>6} {'people':>7}")
        for wid in sorted(wids, key=lambda i: -wviews[i]):
            print(f"  {wid:22} {wviews[wid]:>6} {len(wview_ips[wid]):>7}")
    else:
        print("WARRANTIES: no traffic yet")
    print()


if __name__ == "__main__":
    main()
