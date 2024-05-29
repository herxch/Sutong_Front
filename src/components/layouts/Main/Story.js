import styles from "./Story.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Story = () => {
  const navigate = useNavigate();
  const buttonClickHandler = () => {
    navigate("/about", {
      replace: false,
      state: {},
      scroll: { top: 0, left: 0, behavior: "auto" },
    });
  };

  const [videoSource, setVideoSource] = useState("");
  useEffect(() => {
    const userLocale = navigator.language || navigator.languages[0];
    if (userLocale.startsWith("zh-CN")) {
      setVideoSource(
        "//player.bilibili.com/player.html?bvid=BV1H2421w7B2&page=1"
      );
    } else {
      setVideoSource(
        "https://www.youtube.com/embed/o1Sze3riGxQ?si=O8dwqWkXs4pS3do8"
      );
    }
  }, []);
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyContent}>
        <div className={styles.storyText}>
          <h1 className={styles.storyTitle}>
            Fuel Your Business Growth with Sutong Tire Resource
          </h1>
          <p className={styles.storyParagraph}>
            As a tire distributor, you understand the importance of reliable
            partners. At Sutong Tire Resource, we are committed to empowering
            your business with a winning combination of selection, value, and
            support.
          </p>
          <button className={styles.actionButton} onClick={buttonClickHandler}>
            Learn More
          </button>
        </div>
        <div className={styles.storyVideo}>
          <iframe
            // width="560"
            // height="315"
            className={styles.videoPlayer}
            src={videoSource}
            title="Sutong Tire Resources, Inc"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Story;
