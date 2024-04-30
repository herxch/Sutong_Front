import Address from "./Address";
import styles from "./Addresses.module.css";

const Addresses = () => {
  const Address1 = (
    <>
      33402 HIGHWAY 290, SUITE A<br />
      HOCKLEY, TX 77447
    </>
  );
  const Address2 = (
    <>
      32303 US-90
      <br />
      Brookshire, TX 77423
    </>
  );
  const Address3 = (
    <>
      2812 East 38th Street
      <br />
      Anderson, IN 46013
    </>
  );
  const Address4 = (
    <>
      2190 Teston Road, Unit B<br />
      Vaughan, Ontario L6A 4A7
    </>
  );
  const Address5 = (
    <>
      Hongmao Commercial Building Room 2615
      <br />
      Jia No. 8 Hong Jin Ying East Road
      <br />
      Chaoyang District, Beijing, China 100012
    </>
  );
  return (
    <div className={styles.addressesContainer}>
      <Address
        title="Headquarters, Hockley TX"
        address={Address1}
        phone="713-690-5500"
        tollFree="888-669-8838"
        fax="713-690-5501"
      />
      <Address
        title="Brookshire, TX Distribution Center"
        address={Address2}
        phone="713-766-9118"
      />
      <Address
        title="Anderson, IN Distribution Center"
        address={Address3}
        phone="765-393-3693"
        fax="765-298-8991"
      />
      <Address
        title="Vaughan, Canada Distribution Center"
        address={Address4}
        phone="905-874-8473"
      />
      <Address
        title="Beijing Office"
        address={Address5}
        phone="+86-010-51078677"
        fax="+86-010-64942781"
      />
    </div>
  );
};

export default Addresses;
