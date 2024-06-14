import styles from "./Brands.module.css";
import Brand from "./Brand";
import synergy from "../../../assets/pic/synergy.svg";
import hirun from "../../../assets/pic/hirun.svg";
import supercargo from "../../../assets/pic/supercargo.svg";
import hemisphere from "../../../assets/pic/hemisphere.png";
import roadone from "../../../assets/pic/roadone.svg";
import longmarch from "../../../assets/pic/longmarch.svg";

const Brands = () => {
  return (
    <div className={styles.brands}>
      <h1 className={styles.brandsTitle}>OUR BRANDS</h1>
      <div className={styles.brandsContainer}>
        <Brand name="Synergy" logo={synergy} url="/catalog" id="synergy" />
        <Brand
          name="Long March"
          logo={longmarch}
          url="/catalog"
          id="longmarch"
        />
        <Brand name="Hi-Run" logo={hirun} url="/catalog" id="hirun" />
        <Brand
          name="SuperCargo"
          logo={supercargo}
          url="/catalog"
          id="supercargo"
        />
        <Brand
          name="Hemisphere"
          logo={hemisphere}
          url="/catalog"
          id="hemisphere"
        />
        <Brand name="RoadOne" logo={roadone} url="/catalog" id="roadone" />
      </div>
    </div>
  );
};

export default Brands;
