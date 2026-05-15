import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import CareersHero from "../layouts/Careers/CareersHero";
import Jobs from "../layouts/Careers/Jobs";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const CareersPage = () => {
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
      <CareersHero />
      <Jobs />
      <Footer />
    </Fragment>
  );
};

export default CareersPage;
