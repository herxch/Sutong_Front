import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import ScrollToTopNavLink from "../ui/ScrollToTopNavLink";
import { NAV_LINKS } from "../config/navigation"; // 确保路径指向你的配置文件

// 导入图片资源
import logoW from "../../assets/pic/Sutong Logo White.png";
import logoC from "../../assets/pic/Sutong Logo Color.png";
import burgerBlack from "../../assets/pic/burger_black.svg";
import burgerWhite from "../../assets/pic/burger_white.svg";
import crossBlack from "../../assets/pic/cross_black.svg";
import crossWhite from "../../assets/pic/cross_white.svg";

const Navbar = ({ styleType, visibility = "show" }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 1. 响应式处理：屏幕变宽时自动关闭移动端菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 960px)").matches) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  // 2. 样式辅助函数
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem;

  const getMobileNavLinkClass = ({ isActive }) => {
    const base = styles.mobileLinkItem;
    const activeState = isActive ? styles.active : "";
    const visibilityState = showMobileMenu
      ? styles.mobileLinkItemVisible
      : styles.mobileLinkItemHidden;
    return `${base} ${activeState} ${visibilityState}`;
  };

  // 3. 核心渲染逻辑
  const renderLinks = (isMobile = false) => {
    return (
      NAV_LINKS
        // 过滤掉标记为 hideInNavbar 的项 (如 Tire Registration)
        .filter((link) => !link.hideInNavbar)
        .map((link) => {
          // 情况 A: 外部链接 (例如 Warranty)
          if (link.href) {
            const desktopClass = styles.linkItem;
            const mobileClass = `${styles.mobileLinkItem} ${
              showMobileMenu
                ? styles.mobileLinkItemVisible
                : styles.mobileLinkItemHidden
            }`;

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={isMobile ? mobileClass : desktopClass}
                onClick={() => isMobile && setShowMobileMenu(false)}
              >
                {link.name}
              </a>
            );
          }

          // 情况 B: 内部路由链接 (About, News, Contact 等)
          return (
            <ScrollToTopNavLink
              key={link.to}
              to={link.to}
              className={isMobile ? getMobileNavLinkClass : getNavLinkClass}
              // 移动端点击链接后自动收起菜单
              onClick={() => isMobile && setShowMobileMenu(false)}
            >
              {link.name}
            </ScrollToTopNavLink>
          );
        })
    );
  };

  return (
    <nav
      className={`${styles.navbar} ${styles[styleType]} ${styles[visibility]}`}
    >
      <div className={styles.navContainer}>
        {/* Logo 区域 */}
        {!showMobileMenu && (
          <div className={styles.logo}>
            <ScrollToTopNavLink to="/">
              <img
                src={styleType === "blackbg" ? logoW : logoC}
                alt="Sutong Logo"
              />
            </ScrollToTopNavLink>
          </div>
        )}

        {/* 桌面端导航菜单 */}
        <nav className={styles.links}>{renderLinks(false)}</nav>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className={styles.mobileMenuButton}
          aria-label={showMobileMenu ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={showMobileMenu}
          aria-controls="mobile-nav"
        >
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
            alt=""
            width="24"
            height="24"
          />
        </button>

        {/* 移动端菜单遮罩容器 */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNavContainer} ${styles[styleType]} ${
            showMobileMenu
              ? styles.mobileNavContainerVisible
              : styles.mobileNavContainerHidden
          }`}
        >
          <nav className={styles.mobilelinks} aria-label="Mobile">{renderLinks(true)}</nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
