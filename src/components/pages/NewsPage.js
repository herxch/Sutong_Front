import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import NewsHero from "../layouts/News/NewsHero";
import Posts from "../layouts/News/Posts";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const NewsPage = () => {
  const { navbarVisible } = useScrollControl(
    SCROLL_THRESHOLDS.inner.style,
    SCROLL_THRESHOLDS.inner.hide
  );
  usePageTop();

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
