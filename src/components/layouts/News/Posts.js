import Post from "./Post";
import styles from "./Posts.module.css";

const Posts = () => {
  const post1 = `Sutong consolidated it's two Houston Distribution Centers of 70,000 square feet to a new 135,000 square foot Center in Brookshire, Texas, just outside of Houston. This Distribution Center allows Sutong to increase our capabilities to serve our customers. Brookshire has complete tire and wheel mounting capabilities to serve those customer requiring assemblies.`;
  const post2 = `Effective July 28th Mr. Robert He became President of Sutong China Tire Resources, Inc… Ms. Sue Yang, will continue as Sutong’s Chief Executive Officer.Mr. He has been with Sutong from its inception. He currently manages Sutong’s operations in China with its headquarters in Beijing. Mr. He will maintain offices in Beijing and Houston.`;
  const post3 = `Anderson Indiana Update, Inventory is moving into Sutong’s new Anderson, Indiana Distribution Center at a record pace. Shipping has begun from this new facility as well. Tire mounting machines have also been installed to produce tire and wheel assemblies.The new facility at first is geared up to handle all its customers Dot Com business. Sutong will start an orderly transition of customer shipments from Anderson customer by customer. It was decided that a slow transition would best serve its customers. Sutong prides itself on industry leading customer service and wants to ensure that not only are they ready to service customers from the Anderson Distribution Center but its customers are ready for the change.`;
  const post4 = `Sutong China Tire Resources, Inc., headquartered just outside Houston in Hockley, TX., was established in 1993 as an importer of medium truck tires to serve the independent dealer in the United States. Since its inception Sutong has enjoyed continuous growth and expanded its business into several channels of distribution.`;
  return (
    <div className={styles.postsContainer}>
      <Post
        title="SUTONG TIRE RESOURCES, INC."
        subTitle="Posted on December 15, 2021"
        para={post1}
      />
      <Post
        title="SUTONG TIRE RESOURCES, INC."
        subTitle="Posted on July 28, 2017"
        para={post2}
      />
      <Post
        title="SUTONG TIRE RESOURCES, INC."
        subTitle="Posted on July 15, 2017"
        para={post3}
      />
      <Post
        title="SUTONG TIRE RESOURCES, INC."
        subTitle="Posted on February 20, 2017"
        para={post4}
      />
    </div>
  );
};

export default Posts;
