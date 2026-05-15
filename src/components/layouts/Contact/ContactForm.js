import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import styles from "./ContactForm.module.css";
import Modal from "../../ui/Modal";

const INITIAL_FORM = {
  name: "",
  companyName: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "companyName", label: "Company Name", type: "text", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text" },
  { name: "message", label: "Message", type: "textarea" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (data, recaptcha) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.companyName.trim()) errors.companyName = "Company Name is required";
  if (!data.phone.trim()) errors.phone = "Phone is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Email is invalid";
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) errors.message = "Message is required";
  if (!recaptcha) errors.reCaptcha = "Please verify you are not a robot.";
  return errors;
};

const Field = ({ field, value, error, onChange }) => {
  const errorId = `${field.name}-error`;
  const commonProps = {
    id: field.name,
    name: field.name,
    value,
    onChange,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    className: error ? styles.inputError : undefined,
  };
  return (
    <>
      <label htmlFor={field.name}>
        {field.label} <span aria-hidden="true">*</span>
        {error && (
          <span id={errorId} role="alert" className={styles.error}>
            {error}
          </span>
        )}
      </label>
      {field.type === "textarea" ? (
        <textarea rows="5" {...commonProps} />
      ) : (
        <input type={field.type} autoComplete={field.autoComplete} {...commonProps} />
      )}
    </>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, recaptchaValue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { ...formData, "g-recaptcha-response": recaptchaValue },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setFormData(INITIAL_FORM);
          setRecaptchaValue("");
          setIsSubmitting(false);
          setModal({
            variant: "success",
            title: "Message Sent",
            message: "Thank you for reaching out. Our team will get back to you shortly.",
          });
        },
        (error) => {
          console.error("Error submitting form:", error);
          setIsSubmitting(false);
          setModal({
            variant: "error",
            title: "Submission Failed",
            message: "We couldn't send your message right now. Please try again, or call us at 713-690-5500.",
          });
        }
      );
  };

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <span className={styles.warning}>
          * Please note that we are a distributor and wholesaler and do not sell
          to individual customers. Due to security concerns, we do not respond to
          email order inquiry. Please call us instead. *
        </span>
        <h2>Contact Form</h2>

        {FIELDS.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ))}

        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={setRecaptchaValue}
        />
        {errors.reCaptcha && (
          <p role="alert" className={styles.error}>
            {errors.reCaptcha}
          </p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "SUBMIT"}
        </button>
      </form>

      <Modal
        open={!!modal}
        variant={modal?.variant}
        title={modal?.title}
        message={modal?.message}
        onClose={() => setModal(null)}
      />
    </>
  );
};

export default ContactForm;
