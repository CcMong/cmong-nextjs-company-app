import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import section2img from "../../public/learn_more_section.jpg";
import Link from 'next/link';

export default function Home() {
  
  return (
    <main className={styles.main}>
      <section className={styles.heroCarousel}>
        <Hero />       
      </section>

      <section className={styles.section2}>
        <div className={styles.learnContent}>
          <h2 className={styles.learnTitle}>Justo petentium te vix, scripta regione urbanitas</h2>
          <p className={styles.learnText}>Populo facilisi nam no, dolor delenti deseruisse ne cum, nam quodsi aliquam eligendi ne. Ferri euismod accusata te nec, summo accumsan at vix. Ad vix legere impetus, nam consequat reformidans ut. No sit consul integre voluptatibus, omnuim lucilius ne mel. Et ancillae recteque deterruisset sed, ea nec odio option, ferri assum eum et.</p>
          <ul className={styles.learnBullet}>
            <li>Te pri efficiendi assueverit, id molestie suavitate per</li>
            <li>Te nam dolorem rationibus repudiandae, ne ius falli aliquip consetetur</li>
            <li>Ut qui dicant copiosae interpretaris</li>
            <li>Ut indoctum patrioque voluptaria duo, ut vis semper abhorreant</li>
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
          
          />
        </div>
        
      </section>

      <section className={styles.section3}>
        
      </section>

      <section className={styles.section4}>
        
      </section>

      
    </main>
  )
}
