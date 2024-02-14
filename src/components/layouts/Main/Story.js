import styles from './Story.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Story = () => {
  const navigate = useNavigate();
  const buttonClickHandler = () => {
    navigate('/about');
  };
  const [videoSource, setVideoSource] = useState('');
  useEffect(() => {
    const userLocale = navigator.language || navigator.languages[0];
    if (userLocale.startsWith('zh-CN')) {
      setVideoSource(
        '//player.bilibili.com/player.html?bvid=BV1H2421w7B2&page=1'
      );
    } else {
      setVideoSource(
        'https://www.youtube.com/embed/o1Sze3riGxQ?si=O8dwqWkXs4pS3do8'
      );
    }
  }, []);
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
          <iframe
            // width="560"
            // height="315"
            className={styles.videoPlayer}
            src={videoSource}
            title='Sutong Tire Resources, Inc'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Story;
