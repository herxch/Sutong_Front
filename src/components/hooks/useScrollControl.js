import { useEffect, useState } from "react";

const useScrollControl = (
  scrollThresholdForScrolled = 0,
  scrollThresholdForNavbarVisible = 700
) => {
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > scrollThresholdForScrolled);

      // Always show near the top
      if (currentScrollY <= scrollThresholdForNavbarVisible) {
        setNavbarVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up — show immediately
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down past threshold — hide
        setNavbarVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThresholdForScrolled, scrollThresholdForNavbarVisible]);

  return { scrolled, navbarVisible };
};

export default useScrollControl;
