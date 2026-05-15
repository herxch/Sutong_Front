// Pixel offsets at which the navbar transitions / hides on each page.
// First value: distance scrolled before the navbar switches its style.
// Second value: distance scrolled before the navbar auto-hides.
export const SCROLL_THRESHOLDS = {
  home: { style: 0, hide: 1000 },
  inner: { style: 0, hide: 700 },
  catalog: { style: 0, hide: 250 },
};
