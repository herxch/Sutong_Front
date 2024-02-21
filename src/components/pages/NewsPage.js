import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import NewsHero from "../layouts/News/NewsHero";
import Posts from "../layouts/News/Posts";
import useScrollControl from "../hooks/useScrollControl";

const NewsPage = (props) => {
  const { navbarVisible } = useScrollControl(0, 700);

  return (
    <Fragment>
      <Navbar
        styleType="whitebg"
        visibility={navbarVisible ? "show" : "hide"}
      />
      <NewsHero />
      <Posts />
      <Footer />
    </Fragment>
  );
};

export default NewsPage;
