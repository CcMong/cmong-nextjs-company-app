import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import section2img from "../../public/learn_more_section.jpg";
import Link from 'next/link';
import modalImage from "../../public/company-logo.png";
import { homePageContent } from './data/data';

export default function Home() {
  
  return (
    <main className={styles.main}>
      <section className={styles.heroCarousel}>
        <div className={styles.loadingModal}>
          <Image src={modalImage} height={200} className={styles.modalImg} alt="spinning company logo"/>
        </div>
        <Hero />       
      </section>

      <section className={styles.section2}>
        <div className={styles.learnContent}>
          <h2 className={styles.learnTitle}>
            {homePageContent.section2.heading}
          </h2>
          <p className={styles.learnText}>
            {homePageContent.section2.body}
          </p>
          <ul className={styles.learnBullet}>
            {homePageContent.section2.bullets.map((bullet) => (
              <li>{bullet}</li>
            ))}            
          </ul>
          <Link href="/contact-us">
            <button type='button' className={styles.learnButton}>Learn More</button>
          </Link>

        </div>
        <div className={styles.imgContainer}>
          <Image
            src={section2img} 
            height={0}
            width={0}
            className={styles.learnImg}
            alt="Office at Company "          
          />
        </div>        
      </section>

      <section className={styles.section3}>
        <div className={styles.panImgWrapper}>
          
          <div className={styles.loginContent}>
            <h2 className={styles.loginTitle}>
              {homePageContent.section3.heading}
            </h2>
            <p className={styles.loginText}>
              {homePageContent.section3.body}
            </p>
            <button type="button" className={styles.loginButton}>Log in</button>
          </div>
        </div>         
        
      </section>

      <section className={styles.section4}>
        <h2 className={styles.sec4Title}>
          {homePageContent.section4.heading}
        </h2>
        <h3 className={styles.sec4Subtitle}>
        {homePageContent.section4.subheading}
        </h3>
        <div className={styles.multicol}>
          <p className={styles.sec4Foretext}>
            {homePageContent.section4.foretext}
          </p>
          {homePageContent.section4.paragraphs.map((paragraph) => (
            <p className={styles.sec4Text}>
              {paragraph}
            </p>
          ))}
        </div>

        <button className={styles.sec4Button}>Contact us</button>
        
        
      </section>

      
    </main>
  )
}
