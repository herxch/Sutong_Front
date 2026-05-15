import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Hero from "../layouts/Main/Hero";
import Story from "../layouts/Main/Story";
import Features from "../layouts/Main/Features";
import Brands from "../layouts/Main/Brands";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const MainPage = () => {
  const { scrolled, navbarVisible } = useScrollControl(
    SCROLL_THRESHOLDS.home.style,
    SCROLL_THRESHOLDS.home.hide
  );
  usePageTop();

  return (
    <Fragment>
      <Navbar
        styleType={scrolled ? "whitebg" : "blackbg"}
        visibility={navbarVisible ? "show" : "hide"}
      />
      <Hero />
      <Story />
      <Features />
      <Brands />
      <Footer />
    </Fragment>
  );
};

export default MainPage;
