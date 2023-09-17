import ContactBrand from '@/components/contactBrand/ContactBrand';
import React from 'react';
import styles from "./page.module.css"
import Link from 'next/link';

const Login = () => {
  return (
    <main className={styles.container}>
      <div className={styles.textContainer}>
        <h1>Welcome back!</h1>
        <p>Please login to continue.</p>
      </div>      
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Username</label>
          <input type='text' id="Username" className={styles.inputField}></input>
          <label>Password</label>
          <input type='text' id="Password" className={styles.inputField}></input>
          <Link href="/">
            <button type="button" className={styles.button}>Login</button>
          </Link>
        </form>

      </div>
      <ContactBrand />
    </main>
  )
}

export default Login;