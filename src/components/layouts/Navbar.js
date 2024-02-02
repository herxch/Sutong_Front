import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logoW from "../../assets/pic/Sutong Logo White.png";
import logoC from "../../assets/pic/Sutong Logo Color.png";

const Navbar = ({ styleType, visibility = "show" }) => {
  // Function to determine the class name based on the active state
  const getNavLinkClassName = ({ isActive }) =>
    isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem;

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
          <NavLink to="/about" className={getNavLinkClassName}>
            About
          </NavLink>

          <NavLink to="/tires" className={getNavLinkClassName}>
            Tires
          </NavLink>

          <NavLink to="/careers" className={getNavLinkClassName}>
            Careers
          </NavLink>

          <NavLink to="/news" className={getNavLinkClassName}>
            News
          </NavLink>

          <NavLink to="/contact" className={getNavLinkClassName}>
            Contact
          </NavLink>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
