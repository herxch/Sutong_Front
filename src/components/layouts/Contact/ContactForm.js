import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      formIsValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      formIsValid = false;
    }

    if (!recaptchaValue) {
      errors.reCaptcha = "Please verify you are not a robot.";
      formIsValid = false;
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const combinedData = {
        ...formData,
        "g-recaptcha-response": recaptchaValue,
      };

      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          combinedData,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log("Form submitted successfully:", result.text);
            setFormData({
              name: "",
              companyName: "",
              phone: "",
              email: "",
              subject: "",
              message: "",
            });
            setRecaptchaValue("");
            setErrors({});
            alert("Form submitted successfully! We will contact you soon.");
            setIsSubmitting(false);
          },
          (error) => {
            console.log("Error submitting form:", error.text);
            alert("Submission failed, please try again later.");
            setIsSubmitting(false);
          }
        );
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <span className={styles.warning}>
        * Please note we are distributor and wholesaler, we don't sell to
        individual. *
      </span>
      <h2>Contact Form</h2>
      <label htmlFor="name">
        Name * {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>{" "}
      <input
        type="text"
        id="name"
        name="name"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="companyName">Company Name</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        autoComplete="organization"
        value={formData.companyName}
        onChange={handleChange}
      />
      <label htmlFor="phone">
        Phone * {errors.phone && <p className={styles.error}>{errors.phone}</p>}
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        autoComplete="tel"
        value={formData.phone}
        onChange={handleChange}
      />
      <label htmlFor="email">
        Email * {errors.email && <p className={styles.error}>{errors.email}</p>}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="subject">
        Subject *{" "}
        {errors.subject && <p className={styles.error}>{errors.subject}</p>}
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <label htmlFor="message">
        Message *{" "}
        {errors.message && <p className={styles.error}>{errors.message}</p>}
      </label>
      <textarea
        id="message"
        name="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
      />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleRecaptchaChange}
      />
      {errors.reCaptcha && <p className={styles.error}>{errors.reCaptcha}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "SUBMIT"}
      </button>
    </form>
  );
};

export default ContactForm;
