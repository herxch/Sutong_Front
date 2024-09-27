import Button from "../../ui/Button";
import styles from "./Post.module.css";

const Post = ({ title, subTitle, para, guid }) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <p className={styles.para}>{para}</p>
      {/* 添加一个按钮，点击后打开新标签 */}
      <div className={styles.buttonContainer}>
        <Button text="Read More" href={guid} />
      </div>
    </div>
  );
};

export default Post;
