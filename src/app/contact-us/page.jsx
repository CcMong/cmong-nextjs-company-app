import React from 'react';
import styles from "./page.module.css";
import ContactForm from '@/components/contactForm/ContactForm';
import ContactBrand from '@/components/contactBrand/ContactBrand';

const Contact = () => {
  return (
    <div className={styles.container}>
      <ContactForm />
      <ContactBrand />
    </div>
  )
}

export default Contact;