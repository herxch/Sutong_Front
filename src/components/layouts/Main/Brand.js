import styles from "./Brand.module.css";
import { NavLink } from "react-router-dom";

const Brand = ({ name, description, logo, url, id }) => {
  return (
    <div className={styles.brand}>
      <div className={styles.logoContainer}>
        <NavLink to={`${url}#${id}`}>
          <img
            src={logo}
            alt={`${name} logo`}
            className={styles.logo}
            loading="lazy"
            decoding="async"
          />
          <p className={styles.description}>{description}</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Brand;
