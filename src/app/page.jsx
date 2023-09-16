import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import section2img from "../../public/learn_more_section.jpg";
import Link from 'next/link';
import section3img from "../../public/login_section.jpg";
import modalImage from "../../public/Logo.svg";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <section className={styles.heroCarousel}>
        {/* <div className={styles.loadingModal}>
          <h1>Loading Modal</h1>
          <Image src={modalImage} height={100}/>
        </div> */}
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
        <div className={styles.panImgWrapper}>
          {/* <Image 
            src={section3img}
            height={0}
            width={0}
            sizes='100vw'
            className={styles.panoramicImg}          
          /> */}
          <div className={styles.loginContent}>
            <h1 className={styles.loginTitle}>Nulla sem urna, dictum sed nisi in, viverra rutrum neque</h1>
            <p className={styles.loginText}>Cras sit amet dapibus magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec finibus nulla quis lorem mollis lacinia. Fusce ut arcu ligula. Pellentesque augue ex, pellentesque ut maximus non, eleifend ut lorem. Vestibulum rutrum malesuada turpis, molestie mattis velit maximus ac. Quisque laculis hendrerit ex et tincidunt. Aenean eu magna ut nisi placerat fringilla in sed diam.</p>
            <button type="button" className={styles.loginButton}>Log in</button>
          </div>
        </div>         
        
      </section>

      <section className={styles.section4}>
        <div className="container">
          <div className="wrapper">
            <div className="buttonDiv"></div>
            <div className="buttonDiv"></div>
            <div className="imageContainerDivSwiper">
              <div className="sliderContainer">
                <div className="allContentDiv">
                  <div className="fakegradient"></div>
                  <div className="headlineBox">
                    <h1 className="title"></h1>
                    <p className="subtitle"></p>
                    <button className="contactButton"></button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      
    </main>
  )
}
