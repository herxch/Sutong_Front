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

const BRAND_LIST = [
  { name: "Synergy", logo: synergy, id: "synergy" },
  { name: "Long March", logo: longmarch, id: "longmarch" },
  { name: "Hi-Run", logo: hirun, id: "hirun" },
  { name: "SuperCargo", logo: supercargo, id: "supercargo" },
  { name: "Hemisphere", logo: hemisphere, id: "hemisphere" },
  { name: "RoadOne", logo: roadone, id: "roadone" },
  { name: "Caraway", logo: caraway, id: "caraway" },
  { name: "WolfPack", logo: wolfpack, id: "wolfpack" },
  { name: "SuperStrong", logo: superstrong, id: "superstrong" },
];

const Brands = () => (
  <section className={styles.brands}>
    <header className={styles.brandsHeader}>
      <span className={styles.brandsKicker}>Trusted Portfolio</span>
      <h2 className={styles.brandsTitle}>Our Brands</h2>
    </header>
    <div className={styles.brandsContainer}>
      {BRAND_LIST.map((brand) => (
        <Brand
          key={brand.id}
          name={brand.name}
          logo={brand.logo}
          url="/catalog"
          id={brand.id}
        />
      ))}
    </div>
  </section>
);

export default Brands;
