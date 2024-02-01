import { Fragment, useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const ContactPage = (props) => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Check if the user has scrolled down (you can adjust the threshold)

      if (window.scrollY > 700) {
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
        styleType="whitebg"
        visibility={navbarVisible ? "show" : "hide"}
      />

      <Footer />
    </Fragment>
  );
};

export default ContactPage;
