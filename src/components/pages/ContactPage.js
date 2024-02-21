import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import ContactHero from "../layouts/Contact/ContactHero";
import ContactContent from "../layouts/Contact/ContactContent";
import useScrollControl from "../hooks/useScrollControl";

const ContactPage = (props) => {
  const { navbarVisible } = useScrollControl(0, 700);

  return (
    <Fragment>
      <Navbar
        styleType="whitebg"
        visibility={navbarVisible ? "show" : "hide"}
      />
      <ContactHero />
      <ContactContent />
      <Footer />
    </Fragment>
  );
};

export default ContactPage;
