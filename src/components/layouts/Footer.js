import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css"; // Ensure the path to your CSS module is correct
import Logo from "../../assets/pic/Sutong Logo White.png"; // Import your logo as a React component or image

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <NavLink to="/">
          <img
            src={Logo}
            alt="Sutong Tire Resources Logo"
            className={styles.logo}
          />
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/about"
          className={styles.navItem}
          activeClassName={styles.active}
        >
          About
        </NavLink>
        <NavLink
          to="/tires"
          className={styles.navItem}
          activeClassName={styles.active}
        >
          Tires
        </NavLink>
        <NavLink
          to="/careers"
          className={styles.navItem}
          activeClassName={styles.active}
        >
          Careers
        </NavLink>
        <NavLink
          to="/news"
          className={styles.navItem}
          activeClassName={styles.active}
        >
          News
        </NavLink>
        <NavLink
          to="/contact"
          className={styles.navItem}
          activeClassName={styles.active}
        >
          Contact Us
        </NavLink>
      </nav>
      <div className={styles.copyRight}>
        © 1993 - {new Date().getFullYear()} Sutong Tire Resources, Inc
      </div>
    </footer>
  );
};

export default Footer;
