import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import ContactHero from "../layouts/Contact/ContactHero";
import ContactContent from "../layouts/Contact/ContactContent";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const ContactPage = () => {
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
      <ContactHero />
      <ContactContent />
      <Footer />
    </Fragment>
  );
};

export default ContactPage;
