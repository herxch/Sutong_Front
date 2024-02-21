import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Hero from "../layouts/Main/Hero";
import Story from "../layouts/Main/Story";
import Features from "../layouts/Main/Features";
import useScrollControl from "../hooks/useScrollControl";

const MainPage = (props) => {
  const { scrolled, navbarVisible } = useScrollControl(0, 1000);

  return (
    <Fragment>
      <Navbar
        styleType={scrolled ? "whitebg" : "blackbg"}
        visibility={navbarVisible ? "show" : "hide"}
      />
      <Hero />
      <Story />
      <Features />
      <Footer />
    </Fragment>
  );
};

export default MainPage;
