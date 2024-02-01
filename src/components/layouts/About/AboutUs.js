import styles from "./AboutUs.module.css";
import HQ from "../../../assets/pic/Hockley.jpg";

const AboutUs = () => {
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyContent}>
        <div className={styles.storyText}>
          <h1 className={styles.storyTitle}>About Us</h1>
          <p className={styles.storyParagraph}>
            Issende ferortu ratime egil vis; elut perfendam potilibunum
            mantebatum demne nos verem seroximandum visserfectam omacienatum,
            cum deatinc erissed consunc renatrunum et paris hussed mortes vere,
            co ad publicupiem pere comnere num cerum se tam teatilina, notis am
            popon senterudem, et es sere ninti, iam nos ocus, nia cons pullatusa
            rei scipion tra L. Ad confex nicaet? Licaes! Seris is. Veraede
            ndicibutu quides ceponsulicus essimis ium inequonc opubliciem pos,
            Ti. Lum quam estarbi furit, movendet, vitiemenin nos abus cul vis,
            que no. Cator hiculer hostis haciam catia dium steris red signa,
            Cupiorus viverunt, publin vendach ilintus et? Satem hos
          </p>
        </div>
        <div className={styles.storyPhoto}>
          <img src={HQ} alt="Sutong HQ" className={styles.photoDisplay} />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
