import Addresses from "./Addresses";
import styles from "./ContactContent.module.css";
import ContactForm from "./ContactForm";

const ContactContent = () => {
  return (
    <div className={styles.contentContainer}>
      <Addresses />
      <ContactForm />
    </div>
  );
};

export default ContactContent;
