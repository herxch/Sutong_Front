import { Fragment } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import WarrantyDoc from "../layouts/Warranty/WarrantyDoc";
import { getWarranty } from "../config/warranty";
import usePageTop from "../hooks/usePageTop";

const WarrantyDocPage = () => {
  const { id } = useParams();
  usePageTop();

  const warranty = getWarranty(id);
  if (!warranty) return <Navigate to="/warranty" replace />;

  return (
    <Fragment>
      <Navbar styleType="whitebg" visibility="show" />
      <WarrantyDoc warranty={warranty} />
      <Footer />
    </Fragment>
  );
};

export default WarrantyDocPage;
