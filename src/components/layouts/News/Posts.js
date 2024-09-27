import React, { useState, useEffect } from "react";
import Post from "./Post";
import styles from "./Posts.module.css";
import { XMLParser } from "fast-xml-parser";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        // 使用后端服务器的完整URL
        const response = await fetch("https://wlc.sutongctr.com/rss"); // 请求代理的 RSS 路由
        const text = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(text);
        const items = result.rss.channel.item;

        // 解析RSS并获取必要的数据
        const formattedPosts = items.map((item) => ({
          title: item.title,
          link: item.link, // 获取链接
          description: item.description,
          pubDate: item.pubDate,
          guid: item.guid, // 获取guid作为URL
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div className={styles.postsContainer}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            subTitle={`Posted on ${new Date(
              post.pubDate
            ).toLocaleDateString()}`}
            para={post.description}
            guid={post.guid} // 传递 guid 作为 URL
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default Posts;
