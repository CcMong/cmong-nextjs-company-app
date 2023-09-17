import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import section2img from "../../public/learn_more_section.jpg";
import Link from 'next/link';
import section3img from "../../public/login_section.jpg";
import modalImage from "../../public/company-logo.png";

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
            alt="Office at Company "          
          />
        </div>        
      </section>

      <section className={styles.section3}>
        <div className={styles.panImgWrapper}>
          
          <div className={styles.loginContent}>
            <h2 className={styles.loginTitle}>Nulla sem urna, dictum sed nisi in, viverra rutrum neque</h2>
            <p className={styles.loginText}>Cras sit amet dapibus magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec finibus nulla quis lorem mollis lacinia. Fusce ut arcu ligula. Pellentesque augue ex, pellentesque ut maximus non, eleifend ut lorem. Vestibulum rutrum malesuada turpis, molestie mattis velit maximus ac. Quisque laculis hendrerit ex et tincidunt. Aenean eu magna ut nisi placerat fringilla in sed diam.</p>
            <button type="button" className={styles.loginButton}>Log in</button>
          </div>
        </div>         
        
      </section>

      <section className={styles.section4}>
        <h2 className={styles.sec4Title}>Sed libero justo, lobortis sit amet suscipit non</h2>
        <h3 className={styles.sec4Subtitle}>taria duo ut vis semper abhorreant</h3>
        <div className={styles.multicol}>
          <p className={styles.sec4Foretext}>
             Pellentesque ac condimentum felis. Suspendisse vel suscipit dolor, nec laoreet nulla. Nam auctor ultricies dapibus. Donec ac interdum dui, quis finibus lectus. Cras in ultrices neque. Curabitur eget turpis iaculis diam congue sagittis a vel ligula. Mauris ut arcu ex. Nullam quis orci ante. Nunc felis massa, posuere non gravida in, commodo in arcu. In feugiat magna non volutpat faucibus. Nam aliquam justo nec aliquam iaculis. Integer laoreet pulvinar elit pulvinar fermentum. Morbi vehicula sodales nunc ac varius. Proin porttitor porttitor libero vel pharetra.
          </p>
          <p className={styles.sec4Text}>
          Cras sit amet dapibus magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec magnis dis  parturient montes, nascetur ridiculus mus. Donec finibus nulla quis lorem mollis lacinia. Fusce ut arcu ligula. Pellentesque augue ex, pellentesque ut maximus non, eleifend ut lorem. Vestibulum rutrum malesuada turpis, molestie mattis velit maximus ac. Quisque laculis hendrerit ex et tincidunt. Aenean eu magna ut nisi placerat fringilla in sed diam. Suspendisse tristique vel dui nec imperdiet. Cras mattis ligula quis fermentum suscipit. Proin et elementum arcu, sit amet porttitor diam. Curabitur euismod, erat vitae tristique volutpat, augue lectus dignissim justo, at faucibus orci est a elit.
          </p>
          <p className={styles.sec4Text}>
            Sed sed sapien pretium, maximus felis vel, mollis elit. Sed libero justo, lobortis sit amet suscipit non, auctor non libero. Maecenas quis nisl eget enim porta b;andit a nec sapien. Mauris porttitor lorem ut egestas eusimod. Donec molestie tempor nibh, nec venenatis arcu ullamcorper sit amet. Nulla facilisi. Proin cursus neque ut tortor scelerisque, at iaculis nunc ornare. Pellentesque non nunc nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean et sodales diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor magna augue, non auctor quam placerat nec. Nulla sem urna, dictum sed nisi in, viverra rutrum neque. Aliquam ipsum nunc, porta a augue nec, fringilla mollis arcu. In a vehicula odio. Praesent vulputate turpis eleifend egestas ultrices. Prion nec sagittis nibh. Curabitur fringilla felis a porttitor maximus. Vestibulum aluquet ante nec leo malesuada porttitor sit amet et magna.
          </p>

        </div>

        <button className={styles.sec4Button}>Contact us</button>
        
        
      </section>

      
    </main>
  )
}
