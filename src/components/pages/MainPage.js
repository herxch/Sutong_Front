import { Fragment, useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Hero from "../layouts/Main/Hero";
import Story from "../layouts/Main/Story";
import Features from "../layouts/Main/Features";

const MainPage = (props) => {
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Check if the user has scrolled down (you can adjust the threshold)
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (window.scrollY > 1000) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
