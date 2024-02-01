import styles from "./Story.module.css";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const navigate = useNavigate();
  const buttonClickHandler = () => {
    navigate("/about");
  };
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyContent}>
        <div className={styles.storyText}>
          <h1 className={styles.storyTitle}>
            Si furi condam nosul hors anunum virmium fex sentert
          </h1>
          <p className={styles.storyParagraph}>
            Issende ferortu ratime egil vis; elut perfendam potilibunum
            mantebatum demne nos verem seroximandum visserfectam omacienatum,
            cum deatinc erissed consunc.
          </p>
          <button className={styles.actionButton} onClick={buttonClickHandler}>
            Learn More
          </button>
        </div>
        <div className={styles.storyVideo}>
          <video
            className={styles.videoPlayer}
            controls
            autoPlay
            loop
            muted
            // Add 'playsinline' to allow autoplay on iOS devices
            playsInline
          >
            <source
              src="https://sutongvideo.s3.us-east-2.amazonaws.com/sutongpromovideo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};
export default Story;
