import React from "react";
import styles from "./Navbar.module.css";
import ScrollToTopNavLink from "../ui/ScrollToTopNavLink";
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
          <ScrollToTopNavLink to="/">
            <img
              src={styleType === "blackbg" ? logoW : logoC}
              alt="Sutong Company Logo"
            />
          </ScrollToTopNavLink>
        </div>
        <nav className={styles.links}>
          <ScrollToTopNavLink to="/about" className={getNavLinkClassName}>
            About
          </ScrollToTopNavLink>

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
            Contact
          </ScrollToTopNavLink>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
