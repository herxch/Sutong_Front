import styles from "./Brands.module.css";
import Brand from "./Brand";
import synergy from "../../../assets/pic/synergy.png";
import hirun from "../../../assets/pic/hirun.png";
import supercargo from "../../../assets/pic/supercargo.png";
import hemisphere from "../../../assets/pic/hemisphere.png";
import roadone from "../../../assets/pic/roadone.png";
// import logo6 from "../../../assets/logos/logo6.jpg";
// import logo7 from "../../../assets/logos/logo7.jpg";
// import logo8 from "../../../assets/logos/logo8.jpg";
// import logo9 from "../../../assets/logos/logo9.jpg";

const Brands = () => {
  return (
    <div className={styles.brands}>
      <h1 className={styles.brandsTitle}>OUR BRANDS</h1>
      <div className={styles.brandsContainer}>
        <Brand name="Synergy" logo={synergy} url="https://midd.me/7o61" />
        <Brand name="Hi-Run" logo={hirun} />
        <Brand name="SuperCargo" logo={supercargo} />
        <Brand name="Hemisphere" logo={hemisphere} />
        <Brand name="RoadOne" logo={roadone} />
        {/* <Brand name="Brand 6" description="Description 6" logo={logo6} />
      <Brand name="Brand 7" description="Description 7" logo={logo7} />
      <Brand name="Brand 8" description="Description 8" logo={logo8} />
      <Brand name="Brand 9" description="Description 9" logo={logo9} /> */}
      </div>
    </div>
  );
};

export default Brands;
