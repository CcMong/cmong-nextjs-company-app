import React from 'react';
import styles from "./page.module.css";
import ContactForm from '@/components/contactForm/ContactForm';
import ContactBrand from '@/components/contactBrand/ContactBrand';
import { contactUsContent } from '../data/data';

export const metadata = {
  title: 'Contact Us | Company Ltd.',
  description: 'How to contact Company Ltd. We would love to hear from you.',
}

const Contact = () => {
  return (
    <main className={styles.container}>
      <div className={styles.contactContainer}>
        <div className={styles.form}>
          <div className={styles.heading}>{contactUsContent.heading}</div>
          <p className={styles.formText}>
            {contactUsContent.foretext}
          </p>
          <ContactForm />
        </div>
        
        <div className={styles.brand}>
          <ContactBrand />
        </div>
        
      </div>
      
    </main>
  )
}

export default Contact;