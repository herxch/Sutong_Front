import { useEffect, useState } from "react";

const useScrollControl = (
  scrollThresholdForScrolled = 0, // 触发scrolled状态变更的滚动阈值，默认为0
  scrollThresholdForNavbarVisible = 700 // 触发navbarVisible状态变更的滚动阈值，默认为1000
) => {
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > scrollThresholdForScrolled);
      setNavbarVisible(currentScrollY <= scrollThresholdForNavbarVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化状态

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThresholdForScrolled, scrollThresholdForNavbarVisible]);

  return { scrolled, navbarVisible };
};

export default useScrollControl;
