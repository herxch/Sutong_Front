import Address from "./Address";
import styles from "./Addresses.module.css";
import { OFFICES } from "../../config/offices";

const Addresses = () => (
  <div className={styles.addressesContainer}>
    {OFFICES.map((office) => (
      <Address
        key={office.id}
        title={office.title}
        addressLines={office.addressLines}
        phone={office.phone}
        tollFree={office.tollFree}
        fax={office.fax}
      />
    ))}
  </div>
);

export default Addresses;
