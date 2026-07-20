import { Fragment } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Warranty from "../layouts/Warranty/Warranty";
import useScrollControl from "../hooks/useScrollControl";
import usePageTop from "../hooks/usePageTop";
import { SCROLL_THRESHOLDS } from "../config/scroll";

const WarrantyPage = () => {
  const { navbarVisible } = useScrollControl(
    SCROLL_THRESHOLDS.inner.style,
    SCROLL_THRESHOLDS.inner.hide
  );
  usePageTop();

  return (
    <Fragment>
      <Navbar styleType="whitebg" visibility={navbarVisible ? "show" : "hide"} />
      <Warranty />
      <Footer />
    </Fragment>
  );
};

export default WarrantyPage;
