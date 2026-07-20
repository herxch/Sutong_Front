import { Fragment } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Flipbook from "../layouts/Brochure/Flipbook";
import { getBrochure } from "../config/brochures";
import usePageTop from "../hooks/usePageTop";

const BrochurePage = () => {
  const { id } = useParams();
  usePageTop();

  const brochure = getBrochure(id);
  if (!brochure) return <Navigate to="/catalog" replace />;

  return (
    <Fragment>
      <Navbar styleType="whitebg" visibility="show" />
      <Flipbook brochure={brochure} />
      <Footer />
    </Fragment>
  );
};

export default BrochurePage;
