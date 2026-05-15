import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Catalog.module.css";
import { BRANDS, ALL_BROCHURES_URL } from "../../config/catalog";

const ExternalIcon = ({ className }) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
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
        <ExternalIcon className={styles.categoryCtaArrow} />
      </span>
    </>
  );

  if (!cat.brochureUrl) {
    return <div className={styles.category}>{content}</div>;
  }

  return (
    <a
      href={cat.brochureUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.category} ${styles.categoryLink}`}
      aria-label={`View ${cat.short} brochure for ${brandName}`}
    >
      {content}
    </a>
  );
};

const BrandCard = ({ brand }) => {
  const logo = (
    <img
      src={brand.logo}
      alt={`${brand.name} logo`}
      className={styles.brandLogo}
      loading="lazy"
      decoding="async"
    />
  );
  return (
    <div id={brand.id} className={styles.brand}>
      {brand.brandUrl ? (
        <a href={brand.brandUrl} target="_blank" rel="noopener noreferrer">
          {logo}
        </a>
      ) : (
        logo
      )}
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
        <a
          href={ALL_BROCHURES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.allBrochuresCta}
        >
          ALL Brochures
          <ExternalIcon className={styles.categoryCtaArrow} />
        </a>
        {BRANDS.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
