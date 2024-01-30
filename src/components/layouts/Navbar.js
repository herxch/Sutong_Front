import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logoW from "../../assets/pic/Sutong Logo White.png";
import logoC from "../../assets/pic/Sutong Logo Color.png";

const Navbar = ({ styleType }) => {
  return (
    <nav className={`${styles.navbar} ${styles[styleType]}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img
              src={styleType === "blackbg" ? logoW : logoC}
              alt="Sutong Company Logo"
            />
          </NavLink>
        </div>
        <ul className={styles.links}>
          <li className={styles.linkItem}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li className={styles.linkItem}>
            <NavLink to="/tires">Tires</NavLink>
          </li>
          <li className={styles.linkItem}>
            <NavLink to="/careers">Careers</NavLink>
          </li>
          <li className={styles.linkItem}>
            <NavLink to="/news">News</NavLink>
          </li>
          <li className={styles.linkItem}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
