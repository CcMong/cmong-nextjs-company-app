import React from 'react';
import styles from "./page.module.css";
import ContactForm from '@/components/contactForm/ContactForm';
import ContactBrand from '@/components/contactBrand/ContactBrand';

const Contact = () => {
  return (
    <main className={styles.container}>
      <div className={styles.contactContainer}>
        <div className={styles.form}>
          <div className={styles.heading}>Contact us</div>
          <p className={styles.formText}>
            Populo facilisi nam no, dolor delenti deseruisse ne cum, nam quodsi aliquam eligendi ne. Ferri euismod accusata te nec, summo accumsan at vix.
          </p>
          <ContactForm />
        </div>
        
        <ContactBrand />
      </div>
      
    </main>
  )
}

export default Contact;