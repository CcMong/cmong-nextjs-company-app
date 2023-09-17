import React from 'react';
import styles from "./contactbrand.module.css";
import Image from 'next/image';
import brandLogo from "../../../public/Img_Contact.png";

const ContactBrand = () => {
  return (
    <div className={styles.container}>
        <Image 
          src={brandLogo}
          width={0}
          height={0}
          sizes='100vw'
          className={styles.brandImg}
          alt="company logo"          
        />
    </div>
  )
}

export default ContactBrand