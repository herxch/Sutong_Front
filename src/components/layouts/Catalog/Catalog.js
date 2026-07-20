import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Catalog.module.css";
import { BRANDS } from "../../config/catalog";

const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

const CategoryRow = ({ cat, brandName }) => {
  const content = (
    <>
      <div className={styles.iconTile}>
        <img
          src={cat.icon}
          alt=""
          className={styles.categoryIcon}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.categoryLabel}>{cat.short}</span>
      </div>
      <span className={styles.categoryCta}>
        {cat.short} Brochure
        <ArrowIcon className={styles.categoryCtaArrow} />
      </span>
    </>
  );

  if (!cat.brochureId) {
    return <div className={styles.category}>{content}</div>;
  }

  return (
    <Link
      to={`/brochures/${cat.brochureId}`}
      className={`${styles.category} ${styles.categoryLink}`}
      aria-label={`View ${cat.short} brochure for ${brandName}`}
    >
      {content}
    </Link>
  );
};

const BrandCard = ({ brand }) => {
  return (
    <div id={brand.id} className={styles.brand}>
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        className={styles.brandLogo}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.categoryContainer}>
        {brand.categories.map((cat) => (
          <CategoryRow
            key={`${brand.id}-${cat.short}`}
            cat={cat}
            brandName={brand.name}
          />
        ))}
      </div>
    </div>
  );
};

const Catalog = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const element = document.getElementById(location.hash.substring(1));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div className={styles.brands}>
      <h1 className={styles.brandsTitle}>OUR BRANDS</h1>
      <div className={styles.brandsContainer}>
        {BRANDS.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
