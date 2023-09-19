import React from 'react';
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
        <div className={styles.footerText}>&copy;2023 Created by Charles MONG for AVAMAE.</div>
        <div className={styles.footerText}>Website Development by AVAMAE</div>
    </footer>
  );
};

export default Footer;