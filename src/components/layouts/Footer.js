import React from "react";
import ScrollToTopNavLink from "../ui/ScrollToTopNavLink";
import styles from "./Footer.module.css"; // Ensure the path to your CSS module is correct
import Logo from "../../assets/pic/Sutong Logo White.png"; // Import your logo as an image

const Footer = () => {
  // Function to get the appropriate class name depending on the active state
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
        <ScrollToTopNavLink to="/about" className={getNavLinkClassName}>
          About
        </ScrollToTopNavLink>
        {/* The Tires NavLink is commented out, uncomment if needed */}
        {/* <ScrollToTopNavLink to="/tires" className={getNavLinkClassName}>
          Tires
        </ScrollToTopNavLink> */}
        <ScrollToTopNavLink to="/careers" className={getNavLinkClassName}>
          Careers
        </ScrollToTopNavLink>
        <ScrollToTopNavLink to="/news" className={getNavLinkClassName}>
          News
        </ScrollToTopNavLink>
        <ScrollToTopNavLink to="/contact" className={getNavLinkClassName}>
          Contact Us
        </ScrollToTopNavLink>
      </nav>
      <div className={styles.copyRight}>
        © 1993 - {new Date().getFullYear()} Sutong Tire Resources, Inc
      </div>
    </footer>
  );
};

export default Footer;
