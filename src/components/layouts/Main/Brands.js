import styles from "./Brands.module.css";
import Brand from "./Brand";
import synergy from "../../../assets/pic/synergy.svg";
import hirun from "../../../assets/pic/hirun.svg";
import supercargo from "../../../assets/pic/supercargo.svg";
import hemisphere from "../../../assets/pic/hemisphere.png";
import roadone from "../../../assets/pic/roadone.svg";
import longmarch from "../../../assets/pic/longmarch.svg";
import caraway from "../../../assets/pic/caraway.svg";
import wolfpack from "../../../assets/pic/wolfpack.svg";
import superstrong from "../../../assets/pic/superstrong.svg";

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
        <Brand name="Caraway" logo={caraway} url="/catalog" id="caraway" />
        <Brand name="WolfPack" logo={wolfpack} url="/catalog" id="wolfpack" />
        <Brand
          name="SuperStrong"
          logo={superstrong}
          url="/catalog"
          id="superstrong"
        />
      </div>
    </div>
  );
};

export default Brands;
