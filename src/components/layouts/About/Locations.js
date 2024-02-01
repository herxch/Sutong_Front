import styles from "./Locations.module.css";
import Location from "./Location";
import BrookshireImage from "../../../assets/pic/Brookshire.png";
import AndersonImage from "../../../assets/pic/Anderson.jpg";
import VaughanImage from "../../../assets/pic/Vaughan.jpg";
import BeijingImage from "../../../assets/pic/Beijing.jpg";

const Locations = () => {
  return (
    <div className={styles.locationContainer}>
      <Location
        title="Houston, TX DC"
        description="160,000 square feet"
        photo={BrookshireImage} // Replace with path to your image
      />
      <Location
        title="Anderson, IN DC"
        description="370,000 square feet"
        photo={AndersonImage} // Replace with path to your image
      />
      <Location
        title="Vaughan, Canada DC"
        description="150,000 square feet"
        photo={VaughanImage} // Replace with path to your image
      />
      <Location
        title="Beijing Office, China"
        description="6,000 square feet"
        photo={BeijingImage} // Replace with path to your image
      />
    </div>
  );
};

export default Locations;
