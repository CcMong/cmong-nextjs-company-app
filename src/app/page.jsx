import Image from 'next/image'
import styles from './page.module.css'
import Hero from '@/components/hero/Hero'

export default function Home() {
  
  return (
    <main className={styles.main}>
      <section className={styles.heroCarousel}>
        <Hero />
        
      </section>

      <section className={styles.center}>
        
      </section>

      <section className={styles.center}>
        
      </section>

      <section className={styles.center}>
        
      </section>

      
    </main>
  )
}
