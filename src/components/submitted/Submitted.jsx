import React from 'react';
import styles from "./submitted.module.css";
import Image from 'next/image';
import tick from "../../../public/Icon_Valid.svg";

const Submitted = () => {
  return (
    <div className={styles.container}>
      <div className={styles.greenBg}>
        <div className={styles.circularBg}>
          <Image 
          src={tick}
          height={20}
          alt="submission tick" 
          className={styles.tickImg}       
          />
        </div> 
        <h2 className={styles.mainMessage}>Your message has been sent.</h2>
        <p className={styles.subText}>We will be in contact with you within 24 hours</p>
      </div>
        
    </div>
  )
}

export default Submitted