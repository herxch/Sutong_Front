import styles from "./Catalog.module.css";
import synergy from "../../../assets/pic/synergy.png";
import supercargo from "../../../assets/pic/supercargo.png";
import roadone from "../../../assets/pic/roadone.png";
import hemisphere from "../../../assets/pic/hemisphere.png";
import hirun from "../../../assets/pic/hirun.png";
import mtr from "../../../assets/pic/MTR 200-150 AdobeStock_522105192_Preview.jpg";
import trailer from "../../../assets/pic/Trailer 200-150 AdobeStock_308317141_Preview.jpg";
import suv from "../../../assets/pic/SUV 200-150 AdobeStock_244223192_Preview.jpg";
import lg from "../../../assets/pic/LG 200-150 AdobeStock_334878751_Preview.jpg";
import tube from "../../../assets/pic/Tube 200-150 AdobeStock_815341115_Preview.jpg";
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
              <div className={styles.buttonContainer}>
                <Button text="View MTR Brochure" href="https://midd.me/7o61" />
              </div>
            </div>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Trailer Tire Brochure" />
              </div>
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
              <div className={styles.buttonContainer}>
                <Button text="View MTR Brochure" href="https://midd.me/zzDX" />
              </div>
            </div>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Trailer Tire Brochure" />
              </div>
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
              <div className={styles.buttonContainer}>
                <Button text="View MTR Brochure" />
              </div>
            </div>
            <div className={styles.category}>
              <img
                src={suv}
                alt="Consumer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Consumer Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Consumer Tire Brochure" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.brand}>
          <img src={hemisphere} alt="Hemisphere" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={suv}
                alt="Consumer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Consumer Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Consumer Tire Brochure" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.brand}>
          <img src={hirun} alt="Hi-Run" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Trailer Tire Brochure" />
              </div>
            </div>
            <div className={styles.category}>
              <img src={lg} alt="L&G Tire" className={styles.categoryIcon} />
              <span className={styles.categoryName}>L&G Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View L&G Tire Brochure" />
              </div>
            </div>
            <div className={styles.category}>
              <img src={tube} alt="Tube" className={styles.categoryIcon} />
              <span className={styles.categoryName}>Tube</span>
              <div className={styles.buttonContainer}>
                <Button text="View Tube Brochure" />
              </div>
            </div>
            <div className={styles.category}>
              <img
                src={trailer}
                alt="Trailer Assembly"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Trailer Assembly</span>
              <div className={styles.buttonContainer}>
                <Button text="View Trailer Assembly Brochure" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
