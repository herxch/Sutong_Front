import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import CareersHero from "../layouts/Careers/CareersHero";
import Jobs from "../layouts/Careers/Jobs";
import useScrollControl from "../hooks/useScrollControl";

const CareersPage = (props) => {
  const { navbarVisible } = useScrollControl(0, 700);

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
