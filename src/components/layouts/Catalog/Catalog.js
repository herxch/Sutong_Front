import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Catalog.module.css";
import synergy from "../../../assets/pic/synergy.svg";
import supercargo from "../../../assets/pic/supercargo.svg";
import roadone from "../../../assets/pic/roadone.svg";
import hemisphere from "../../../assets/pic/hemisphere.png";
import hirun from "../../../assets/pic/hirun.svg";
import longmarch from "../../../assets/pic/longmarch.svg";
import caraway from "../../../assets/pic/caraway.svg";
import wolfpack from "../../../assets/pic/wolfpack.svg";
import superstrong from "../../../assets/pic/superstrong.svg";
import mtr from "../../../assets/pic/mtr.svg";
import trailer from "../../../assets/pic/trailer.svg";
import suv from "../../../assets/pic/suv.svg";
import lg from "../../../assets/pic/lg.svg";
import tube from "../../../assets/pic/tube.svg";
import atv from "../../../assets/pic/atv.svg";
import farm from "../../../assets/pic/farm.svg";
import Button from "../../ui/Button";

const Catalog = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className={styles.brands}>
      <h1 className={styles.brandsTitle}>OUR BRANDS</h1>
      <div className={styles.brandsContainer}>
        <div id="synergy" className={styles.brand}>
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
        <div id="longmarch" className={styles.brand}>
          <img src={longmarch} alt="Long March" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={mtr}
                alt="Medium Truck Radial"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>Medium Truck Radial</span>
              <div className={styles.buttonContainer}>
                <Button text="View MTR Brochure" href="https://midd.me/NARJ" />
              </div>
            </div>
          </div>
        </div>
        <div id="supercargo" className={styles.brand}>
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
        <div id="roadone" className={styles.brand}>
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
        <div id="hemisphere" className={styles.brand}>
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
        <div id="hirun" className={styles.brand}>
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
        <div id="caraway" className={styles.brand}>
          <img src={caraway} alt="Caraway" className={styles.brandLogo} />
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
          </div>
        </div>
        <div id="wolfpack" className={styles.brand}>
          <img src={wolfpack} alt="Wolf Pack" className={styles.brandLogo} />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img
                src={atv}
                alt="ATV/UTV Tire"
                className={styles.categoryIcon}
              />
              <span className={styles.categoryName}>ATV/UTV Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View ATV/UTV Tire Brochure" />
              </div>
            </div>
            <div className={styles.category}>
              <img src={lg} alt="L&G Tire" className={styles.categoryIcon} />
              <span className={styles.categoryName}>L&G Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View L&G Tire Brochure" />
              </div>
            </div>
          </div>
        </div>
        <div id="superstrong" className={styles.brand}>
          <img
            src={superstrong}
            alt="Super Strong"
            className={styles.brandLogo}
          />
          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img src={farm} alt="Farm Tire" className={styles.categoryIcon} />
              <span className={styles.categoryName}>Farm Tire</span>
              <div className={styles.buttonContainer}>
                <Button text="View Farm Tire Brochure" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
