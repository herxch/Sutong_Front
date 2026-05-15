import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Story.module.css";
import Button from "../../ui/Button";

const Story = () => {
  const navigate = useNavigate();
  const buttonClickHandler = () => navigate("/about");

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
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.kicker}>Who We Are</span>
          <h2 className={styles.title}>
            Fuel Your Business Growth with Sutong Tire Resources
          </h2>
          <p className={styles.paragraph}>
            As a tire distributor, we understand the importance of a reliable
            partner. At Sutong Tire Resources, we are committed to empowering
            your business with a winning combination of selection, value, and
            support.
          </p>
          <Button
            onClick={buttonClickHandler}
            text="Learn More"
            href="/about"
            newWindow={false}
          />
        </div>
        <div className={styles.videoFrame}>
          <span className={styles.frameCorner} aria-hidden="true" />
          {videoSource && (
            <iframe
              className={styles.videoPlayer}
              src={videoSource}
              title="Sutong Tire Resources introduction video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Story;
