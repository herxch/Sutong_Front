import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const handleRecaptchaChange = (value) => {
    console.log("Captcha value:", value);
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

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      alert("Please verify you are not a robot.");
      return;
    }
    if (validateForm()) {
      // Handle form submission logic here, like sending data to a server
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <label htmlFor="name">
        Name * {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>{" "}
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="companyName">Company Name</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
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
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default ContactForm;
