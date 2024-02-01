import styles from "./Post.module.css";

const Post = ({ title, subTitle, para }) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <p className={styles.para}>{para}</p>
    </div>
  );
};
export default Post;
