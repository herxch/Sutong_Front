import React from "react";
import styles from "./Navbar.module.css";
import ScrollToTopNavLink from "../ui/ScrollToTopNavLink";
import logoW from "../../assets/pic/Sutong Logo White.png";
import logoC from "../../assets/pic/Sutong Logo Color.png";
import burgerBlack from "../../assets/pic/burger_black.svg";
import burgerWhite from "../../assets/pic/burger_white.svg";
import crossBlack from "../../assets/pic/cross_black.svg";
import crossWhite from "../../assets/pic/cross_white.svg";
import { useState, useEffect } from "react";

const Navbar = ({ styleType, visibility = "show" }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // Function to determine the class name based on the active state
  const getNavLinkClassName = ({ isActive }) =>
    isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem;

  const getMobileNavLinkClassName = ({ isActive }) =>
    isActive
      ? showMobileMenu
        ? `${styles.mobileLinkItem} ${styles.active} ${styles.mobileLinkItemVisible}`
        : `${styles.mobileLinkItem} ${styles.active} ${styles.mobileLinkItemHidden}`
      : showMobileMenu
      ? `${styles.mobileLinkItem}  ${styles.mobileLinkItemVisible}`
      : `${styles.mobileLinkItem}  ${styles.mobileLinkItemHidden}`;

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // 使用 useEffect 钩子来处理媒体查询
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 600px)").matches) {
        setShowMobileMenu(false); // 当屏幕宽度大于600px时， 关闭移动菜单
      }
    };

    // 监听屏幕宽度变化
    window.addEventListener("resize", handleResize);

    // 初始化检查
    handleResize();

    // 清理函数：组件卸载时移除监听器
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 空依赖数组确保effect只在挂载时运行一次

  const mobileNavContainerClass = showMobileMenu
    ? styles.mobileNavContainerVisible
    : styles.mobileNavContainerHidden;

  return (
    <nav
      className={`${styles.navbar} ${styles[styleType]} ${styles[visibility]}`}
    >
      <div className={styles.navContainer}>
        {!showMobileMenu && (
          <div className={styles.logo}>
            <ScrollToTopNavLink to="/">
              <img
                src={styleType === "blackbg" ? logoW : logoC}
                alt="Sutong Company Logo"
              />
            </ScrollToTopNavLink>
          </div>
        )}
        <nav className={styles.links}>
          <ScrollToTopNavLink to="/about" className={getNavLinkClassName}>
            About
          </ScrollToTopNavLink>

          <ScrollToTopNavLink to="/catalog" className={getNavLinkClassName}>
            Catalog
          </ScrollToTopNavLink>

          <ScrollToTopNavLink to="/careers" className={getNavLinkClassName}>
            Careers
          </ScrollToTopNavLink>

          <ScrollToTopNavLink to="/news" className={getNavLinkClassName}>
            News
          </ScrollToTopNavLink>

          <ScrollToTopNavLink to="/contact" className={getNavLinkClassName}>
            Contact
          </ScrollToTopNavLink>
        </nav>
        <button onClick={toggleMobileMenu} className={styles.mobileMenuButton}>
          <img
            src={
              styleType === "blackbg"
                ? showMobileMenu
                  ? crossWhite
                  : burgerWhite
                : showMobileMenu
                ? crossBlack
                : burgerBlack
            }
            alt="Menu"
            width="24"
            height="24"
          />
        </button>
        <div
          className={`${styles.mobileNavContainer} ${styles[styleType]} ${mobileNavContainerClass}`}
        >
          <nav className={styles.mobilelinks}>
            <ScrollToTopNavLink
              to="/about"
              className={getMobileNavLinkClassName}
            >
              About
            </ScrollToTopNavLink>

            <ScrollToTopNavLink
              to="/catalog"
              className={getMobileNavLinkClassName}
            >
              Catalog
            </ScrollToTopNavLink>

            <ScrollToTopNavLink
              to="/careers"
              className={getMobileNavLinkClassName}
            >
              Careers
            </ScrollToTopNavLink>

            <ScrollToTopNavLink
              to="/news"
              className={getMobileNavLinkClassName}
            >
              News
            </ScrollToTopNavLink>

            <ScrollToTopNavLink
              to="/contact"
              className={getMobileNavLinkClassName}
            >
              Contact
            </ScrollToTopNavLink>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
