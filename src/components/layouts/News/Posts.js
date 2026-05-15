import { useState, useEffect } from "react";
import { XMLParser } from "fast-xml-parser";
import Post from "./Post";
import styles from "./Posts.module.css";

const RSS_URL = "https://wlc.sutongctr.com/rss";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch(RSS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(text);
        const items = result?.rss?.channel?.item;
        const list = Array.isArray(items) ? items : items ? [items] : [];

        if (cancelled) return;
        setPosts(
          list.map((item) => ({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
            guid: typeof item.guid === "object" ? item.guid["#text"] : item.guid,
          }))
        );
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching RSS feed:", error);
        setStatus("error");
      }
    };

    fetchRSSFeed();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.postsContainer}>
      {status === "loading" && (
        <p className={styles.statusMessage}>Loading posts...</p>
      )}
      {status === "error" && (
        <p className={styles.statusMessage}>
          Unable to load news feed right now. Please try again later.
        </p>
      )}
      {status === "ready" && posts.length === 0 && (
        <p className={styles.statusMessage}>No news posts available.</p>
      )}
      {status === "ready" &&
        posts.map((post) => (
          <Post
            key={post.guid || post.link || post.title}
            title={post.title}
            subTitle={`Posted on ${new Date(post.pubDate).toLocaleDateString()}`}
            para={post.description}
            guid={post.guid}
          />
        ))}
    </div>
  );
};

export default Posts;
