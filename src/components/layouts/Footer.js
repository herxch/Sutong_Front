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
            alt="Sutong Tire Resources"
            className={styles.logo}
            loading="lazy"
            decoding="async"
          />
        </ScrollToTopNavLink>
      </div>

      <nav className={styles.nav} aria-label="Footer">
        {NAV_LINKS.filter((link) => !link.hideInFooter).map((link) => {
          const label = link.footerName || link.name;
          return link.href ? (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
            >
              {label}
            </a>
          ) : (
            <ScrollToTopNavLink
              key={link.to}
              to={link.to}
              className={getNavLinkClassName}
            >
              {label}
            </ScrollToTopNavLink>
          );
        })}
      </nav>

      <div className={styles.copyRight}>
        © 1993 - {new Date().getFullYear()} Sutong Tire Resources, Inc
      </div>
    </footer>
  );
};

export default Footer;
