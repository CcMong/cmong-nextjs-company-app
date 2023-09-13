"use client"

import React from 'react';
import styles from "./navbar.module.css";
import logo from "../../../public/Logo.svg";
import Image from 'next/image';
import Link from 'next/link';

const navlinks = [
    {
        id: 1,
        title: "HOME",
        url: "/",
    },
    {
        id: 2,
        title: "ABOUT US",
        url: "/about-us",
    },
    {
        id: 3,
        title: "CONTACT US",
        url: "/contact-us",
    },    
];

const Navbar = () => {
    return (
      <nav className={styles.container}>
          <Link href="/">
              <Image 
                  src={logo}
                  height={25}
                  alt="Company Ltd Logo"
              />            
          </Link>
          <div className={styles.links}>
              {navlinks.map((navlink) => (
                  <Link 
                      key={navlink.id}
                      href={navlink.url}
                  >
                      {navlink.title}
                  </Link>
              ))}
              <Link href="/login">
                  <button 
                      className={styles.login}
                      onClick={() => {console.log("login")}}
                  >
                      Log in
                  </button>
              </Link>
              
          </div>
      </nav>
    );
  };
  
  export default Navbar;