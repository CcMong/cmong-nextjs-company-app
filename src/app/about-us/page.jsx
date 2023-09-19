import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import centralImage from "../../../public/learn_more_section.jpg"
import { aboutUsContent } from '../data/data';


const About = () => {
  return (
    <main className={styles.container}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutHeading}>
          {aboutUsContent.pageTitle}
        </h1>
        <section className={styles.aboutText}>
          <p className={styles.foreText}>
            {aboutUsContent.foretext}
          </p>
          <p className={styles.bodyText}>
            {aboutUsContent.paragraphs[0]}<span className={styles.blueText}> Praesent varius porta blandit</span> mollis, felis ut convallis convallis.
          </p>
          <p className={styles.bodyText}>
            {aboutUsContent.paragraphs[1]}
          </p>
        </section>
        <div className={styles.imageContainer}>
          <Image 
          src={centralImage}
          height={0}
          className={styles.centralImage} 
          alt="Company's open plan office."                 
        />
        </div>
        <section className={styles.aboutText}>
          <p className={styles.bodyText}>
          {aboutUsContent.paragraphs[2]}
          </p>
        </section>

        <section>
          <h2 className={styles.bulletHeading}>
            {aboutUsContent.bulletHeading}
          </h2>
          <ul className={styles.bulletText}>
            {aboutUsContent.bullets.map((bullet) => (
              <li>{bullet}</li>
            ))}
          </ul>
        </section>

        <section className={styles.aboutText}>
          <p className={styles.bodyText}>
            {aboutUsContent.paragraphs[3]}
          </p>
          <p className={styles.bodyText}>
            {aboutUsContent.paragraphs[4]}
          </p>

        </section>    

      </div>    

    </main>
  )
}

export default About;