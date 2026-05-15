import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Catalog.module.css";
import Button from "../../ui/Button";
import { BRANDS, ALL_BROCHURES_URL } from "../../config/catalog";

const CategoryRow = ({ cat, brandName }) => {
  const content = (
    <>
      <img
        src={cat.icon}
        alt=""
        className={styles.categoryIcon}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.categoryName}>{cat.name}</span>
      <span className={styles.categoryCta}>
        View {cat.short} Brochure
        <span className={styles.categoryCtaArrow} aria-hidden="true">→</span>
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
        <Button text="View ALL Brochures" href={ALL_BROCHURES_URL} />
        {BRANDS.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
