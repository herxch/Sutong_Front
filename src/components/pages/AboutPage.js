import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import AboutHero from "../layouts/About/AboutHero";
import AboutUs from "../layouts/About/AboutUs";
import Locations from "../layouts/About/Locations";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const AboutPage = () => {
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
      <AboutHero />
      <AboutUs />
      <Locations />
      <Footer />
    </Fragment>
  );
};

export default AboutPage;
