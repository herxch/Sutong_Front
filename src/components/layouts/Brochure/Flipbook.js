import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import Lightbox from "./Lightbox";
import styles from "./Flipbook.module.css";

const PUBLIC = process.env.PUBLIC_URL || "";

// A US Letter page is 0.773 as wide as it is tall.
const PAGE_RATIO = 0.773;
// Halo kept around the book: a dragged page corner may swing this far out
// before it is clipped. Zero means nothing ever paints outside the book's own
// footprint -- raise it to give the lifted corner room, at the cost of letting
// it show past the page edges.
const CLIP_SLACK = 0;

const Page = forwardRef(({ src, number, hotspot, onZoom }, ref) => {
  const r = hotspot?.rect;
  return (
    <div className={styles.page} ref={ref}>
      <img
        className={styles.pageImg}
        src={src}
        alt={`Page ${number}`}
        loading={number <= 2 ? "eager" : "lazy"}
        draggable={false}
      />
      {hotspot?.image && r && (
        <button
          type="button"
          className={styles.zoomBtn}
          style={{
            left: `calc(${r.x + r.w}% - 40px)`,
            top: `calc(${r.y + r.h}% - 40px)`,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onZoom(hotspot);
          }}
          aria-label={`View ${hotspot.code} hi-res image`}
          title="View hi-res image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
            <line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="7" x2="10" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});
Page.displayName = "BrochurePage";

const Flipbook = ({ brochure }) => {
  const bookRef = useRef(null);
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(brochure.pages);
  const [hotspots, setHotspots] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [logoOpen, setLogoOpen] = useState(false);
  const [bookMaxH, setBookMaxH] = useState(640);
  const [stageW, setStageW] = useState(0);

  // Fit the book (plus title + toolbar) into the viewport below the navbar,
  // so the brochure shows in one screen without page scrolling.
  useLayoutEffect(() => {
    const calc = () => {
      // offsetTop, not getBoundingClientRect().top: the latter is relative to
      // the viewport, so arriving here from a scrolled catalog page measured a
      // negative offset and sized the book roughly twice too large.
      const top = wrapRef.current?.offsetTop ?? 0; // navbar height
      const avail = window.innerHeight - top; // space left under the navbar
      // title + toolbar + hint + paddings (168), plus the clip halo above and
      // below the book.
      const reserve = 168 + CLIP_SLACK * 2;
      setBookMaxH(Math.max(320, Math.min(900, Math.round(avail - reserve))));

      // How much width the book may use: the stage minus the arrows beside it,
      // which the CSS hides below 640px. Without this the spread is sized from
      // height alone and runs off the sides of a phone.
      const arrows = window.innerWidth > 640 ? 2 * (48 + 10) : 0;
      setStageW(Math.max(0, (stageRef.current?.clientWidth ?? 0) - arrows));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [brochure.id]);

  useEffect(() => {
    let alive = true;
    fetch(`${PUBLIC}${brochure.basePath}/hotspots.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => alive && setHotspots(d || {}))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [brochure.basePath]);

  const hasZoomable = Object.values(hotspots).some((h) => h?.image);
  // Keep in step with minWidth below, or the two constraints fight and
  // StPageFlip sizes the spread inconsistently.
  const pageW = Math.max(260, Math.round(bookMaxH * PAGE_RATIO));
  // On a narrow screen the stage wins, and StPageFlip falls back to showing a
  // single page inside it.
  const clipW = stageW
    ? Math.min(pageW * 2 + CLIP_SLACK * 2, stageW)
    : pageW * 2 + CLIP_SLACK * 2;

  const pageUrls = Array.from(
    { length: brochure.pages },
    (_, i) =>
      `${PUBLIC}${brochure.basePath}/page-${String(i + 1).padStart(2, "0")}.${
        brochure.ext
      }`
  );

  const flipNext = useCallback(
    () => bookRef.current?.pageFlip()?.flipNext(),
    []
  );
  const flipPrev = useCallback(
    () => bookRef.current?.pageFlip()?.flipPrev(),
    []
  );

  const handleInit = useCallback(() => {
    const pf = bookRef.current?.pageFlip?.();
    if (pf) setCount(pf.getPageCount());
  }, []);

  const openZoom = useCallback(
    (h) =>
      setLightbox({
        src: `${PUBLIC}${h.image}`,
        caption: `${brochure.title} · ${h.code}`,
      }),
    [brochure.title]
  );

  const toggleFullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) return;
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipNext, flipPrev, lightbox]);

  return (
    <section className={styles.wrapper} ref={wrapRef}>
      <h1 className={styles.title}>{brochure.title}</h1>

      <div className={styles.stage} ref={stageRef}>
        <button
          className={`${styles.nav} ${styles.navLeft}`}
          onClick={flipPrev}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div
          className={styles.bookClip}
          /* Width is explicit because StPageFlip measures its parent to size
             the spread. Height is left to the flex box so the clip hugs
             whatever height the book settles on -- on a phone the book is
             width-constrained and ends up shorter than bookMaxH. */
          style={{ width: clipW, padding: CLIP_SLACK }}
        >
          <HTMLFlipBook
            /* Remount when either dimension changes so StPageFlip re-measures
               its parent. */
            key={`${bookMaxH}-${clipW}`}
            ref={bookRef}
            className={styles.book}
            width={550}
            height={711}
            size="stretch"
            minWidth={260}
            maxWidth={pageW}
            minHeight={336}
            maxHeight={bookMaxH}
            drawShadow
            maxShadowOpacity={0.4}
            showCover
            mobileScrollSupport
            flippingTime={700}
            useMouseEvents
            disableFlipByClick
            onInit={handleInit}
            onFlip={(e) => setPage(e.data)}
          >
            {pageUrls.map((src, i) => (
              <Page
                key={i}
                src={src}
                number={i + 1}
                hotspot={hotspots[i + 1]}
                onZoom={openZoom}
              />
            ))}
          </HTMLFlipBook>
        </div>

        <button
          className={`${styles.nav} ${styles.navRight}`}
          onClick={flipNext}
          aria-label="Next page"
        >
          ›
        </button>
      </div>

      <div className={styles.toolbar}>
        <button className={styles.btn} onClick={flipPrev}>
          ‹ Prev
        </button>
        <span className={styles.counter}>
          {Math.min(page + 1, count)} / {count}
        </span>
        <button className={styles.btn} onClick={flipNext}>
          Next ›
        </button>
        <button className={styles.btn} onClick={toggleFullscreen}>
          ⛶ Fullscreen
        </button>

        {brochure.logo && (
          <div className={styles.dropdown}>
            <button
              className={styles.btn}
              onClick={() => setLogoOpen((o) => !o)}
            >
              ↓ Logo ▾
            </button>
            {logoOpen && (
              <div className={styles.menu} onMouseLeave={() => setLogoOpen(false)}>
                <a
                  className={styles.menuItem}
                  href={`${PUBLIC}${brochure.logo.png}`}
                  download
                  onClick={() => setLogoOpen(false)}
                >
                  PNG
                </a>
                <a
                  className={styles.menuItem}
                  href={`${PUBLIC}${brochure.logo.svg}`}
                  download
                  onClick={() => setLogoOpen(false)}
                >
                  SVG
                </a>
              </div>
            )}
          </div>
        )}

        {brochure.pdfUrl && (
          <a
            className={styles.btn}
            href={`${PUBLIC}${brochure.pdfUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            ↓ PDF
          </a>
        )}
      </div>

      <p className={styles.hint}>
        Drag a page corner or use the arrows / ← → keys to flip.
        {hasZoomable && (
          <>
            {" "}
            Click the <span className={styles.inlineIcon}> ⌕ </span> icon on a
            tire to view a hi-res image.
          </>
        )}
      </p>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default Flipbook;
