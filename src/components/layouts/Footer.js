import React from "react";
import ScrollToTopNavLink from "../ui/ScrollToTopNavLink";
import styles from "./Footer.module.css";
import Logo from "../../assets/pic/Sutong Logo White.png";
import { NAV_LINKS } from "../config/navigation";

const Footer = () => {
  const getNavLinkClassName = ({ isActive }) =>
    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem;

  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <ScrollToTopNavLink to="/" className={styles.logoLink}>
          <img
            src={Logo}
            alt="Sutong Tire Resources Logo"
            className={styles.logo}
          />
        </ScrollToTopNavLink>
      </div>

      <nav className={styles.nav}>
        {NAV_LINKS.map((link) =>
          link.href ? (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
            >
              {link.name}
            </a>
          ) : (
            <ScrollToTopNavLink
              key={link.to}
              to={link.to}
              className={getNavLinkClassName}
            >
              {/* 这里做个小优化：Footer 习惯显示 "Contact Us" 而非 "Contact" */}
              {link.name === "Contact" ? "Contact Us" : link.name}
            </ScrollToTopNavLink>
          ),
        )}
      </nav>

      <div className={styles.copyRight}>
        © 1993 - {new Date().getFullYear()} Sutong Tire Resources, Inc
      </div>
    </footer>
  );
};

export default Footer;
