import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import AboutHero from "../layouts/About/AboutHero";
import AboutUs from "../layouts/About/AboutUs";
import Locations from "../layouts/About/Locations";
import useScrollControl from "../hooks/useScrollControl";

const AboutPage = (props) => {
  const { navbarVisible } = useScrollControl(0, 700);

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
