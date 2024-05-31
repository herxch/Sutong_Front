import { Fragment, useEffect } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import useScrollControl from "../hooks/useScrollControl";
import Catalog from "../layouts/Catalog/Catalog";

const CatalogPage = (props) => {
  const { navbarVisible } = useScrollControl(0, 250);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Fragment>
      <Navbar
        styleType="whitebg"
        visibility={navbarVisible ? "show" : "hide"}
      />
      <Catalog />
      <Footer />
    </Fragment>
  );
};

export default CatalogPage;
