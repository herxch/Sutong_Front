import { Fragment, useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const MainPage = (props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Check if the user has scrolled down (you can adjust the threshold)
      if (window.scrollY > 180) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
      <Navbar styleType={scrolled ? "whitebg" : "blackbg"} />
      <Footer />
    </Fragment>
  );
};

export default MainPage;
