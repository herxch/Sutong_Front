import { Navigate, useParams } from "react-router-dom";
import { legacyCatalogTarget } from "../config/legacyCatalog";

/** Sends an old catalog.sutongctr.com link to wherever it lives now. */
const LegacyCatalogRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={legacyCatalogTarget(slug)} replace />;
};

export default LegacyCatalogRedirect;
