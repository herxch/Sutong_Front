import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logoW from "../../assets/pic/Sutong Logo White.png";
import logoC from "../../assets/pic/Sutong Logo Color.png";

const Navbar = ({ styleType, visibility = "show" }) => {
  return (
    <nav
      className={`${styles.navbar} ${styles[styleType]} ${styles[visibility]}`}
    >
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img
              src={styleType === "blackbg" ? logoW : logoC}
              alt="Sutong Company Logo"
            />
          </NavLink>
        </div>
        <nav className={styles.links}>
          <NavLink
            to="/about"
            className={styles.linkItem}
            activeClassName={styles.active}
          >
            About
          </NavLink>

          <NavLink
            to="/tires"
            className={styles.linkItem}
            activeClassName={styles.active}
          >
            Tires
          </NavLink>

          <NavLink
            to="/careers"
            className={styles.linkItem}
            activeClassName={styles.active}
          >
            Careers
          </NavLink>

          <NavLink
            to="/news"
            className={styles.linkItem}
            activeClassName={styles.active}
          >
            News
          </NavLink>

          <NavLink
            to="/contact"
            className={styles.linkItem}
            activeClassName={styles.active}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
