import styles from "./Catalog.module.css";
import Brand from "../Main/Brand";
import synergy from "../../../assets/pic/synergy.png";
import hirun from "../../../assets/pic/hirun.png";
import supercargo from "../../../assets/pic/supercargo.png";
import hemisphere from "../../../assets/pic/hemisphere.png";
import roadone from "../../../assets/pic/roadone.png";
// import logo6 from "../../../assets/logos/logo6.jpg";
// import logo7 from "../../../assets/logos/logo7.jpg";
// import logo8 from "../../../assets/logos/logo8.jpg";
// import logo9 from "../../../assets/logos/logo9.jpg";
import mtr from "../../../assets/pic/MTR 200-150 AdobeStock_522105192_Preview.jpg";
import trailer from "../../../assets/pic/Trailer 200-150 AdobeStock_308317141_Preview.jpg";
import suv from "../../../assets/pic/SUV 200-150 AdobeStock_244223192_Preview.jpg";
import Button from "../../ui/Button";

const Catalog = () => {
  return (
    <div className={styles.brands}>
      <h1 className={styles.brandsTitle}>OUR BRANDS</h1>
      <div className={styles.brandsContainer}>
        <div className={styles.brand}>
          <img src={synergy} alt="Synergy" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={mtr}
                alt="Medium Truck Radial"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Medium Truck Radial</span>
              <Button text="View MTR Brochure" href="https://midd.me/7o61" />
            </div>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Tire</span>
              <Button text="View Trailer Tire Brochure" />
            </div>
          </div>
        </div>
        <div className={styles.brand}>
          <img src={supercargo} alt="SuperCargo" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={mtr}
                alt="Medium Truck Radial"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Medium Truck Radial</span>
              <Button text="View MTR Brochure" />
            </div>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Tire</span>
              <Button text="View Trailer Tire Brochure" />
            </div>
          </div>
        </div>
        <div className={styles.brand}>
          <img src={roadone} alt="RoadOne" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={mtr}
                alt="Medium Truck Radial"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Medium Truck Radial</span>
              <Button text="View MTR Brochure" />
            </div>
            <div className={styles.category}>
              <img
                src={suv}
                alt="Consumer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Consumer Tire</span>
              <Button text="View Consumer Tire Brochure" />
            </div>
          </div>
        </div>
        {/* <Brand
          name="Synergy"
          description="For Commercial Tire"
          logo={synergy}
          // url="https://midd.me/7o61"
        />
        <Brand
          name="Hi-Run"
          description="For Trailer Tire, Specialty Tire"
          logo={hirun}
        />
        <Brand
          name="SuperCargo"
          description="For Commercial Tire"
          logo={supercargo}
        />
        <Brand
          name="Hemisphere"
          description="For Consumer Tire"
          logo={hemisphere}
        />
        <Brand name="RoadOne" description="For Consumer Tire" logo={roadone} /> */}
        {/* <Brand name="Brand 6" description="Description 6" logo={logo6} />
      <Brand name="Brand 7" description="Description 7" logo={logo7} />
      <Brand name="Brand 8" description="Description 8" logo={logo8} />
      <Brand name="Brand 9" description="Description 9" logo={logo9} /> */}
      </div>
    </div>
  );
};

export default Catalog;
