import { Fragment } from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Catalog from "../layouts/Catalog/Catalog";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const CatalogPage = () => {
  const { navbarVisible } = useScrollControl(
    SCROLL_THRESHOLDS.catalog.style,
    SCROLL_THRESHOLDS.catalog.hide
  );
  usePageTop({ respectHash: true });

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
