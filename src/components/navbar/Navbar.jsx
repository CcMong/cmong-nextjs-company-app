"use client"

import React, { useState } from 'react';
import styles from "./navbar.module.css";
import logo from "../../../public/Logo.svg";
import Image from 'next/image';
import Link from 'next/link';
import { navlinks } from '@/app/data/data';

const Navbar = () => {

    // Using state to operate the hamburger button

    const [isOpen, setIsOpen] = useState(false);

    // Function to handle the hamburger button open and close

    const handleMenuClick = () => {
        setIsOpen(!isOpen)
    }

    return (
      <nav className={styles.container}>
        {/* Hamburger Button */}
        <button className={styles.hamburger} onClick={handleMenuClick}>
            <span className={isOpen ? styles.hamburgerTopOpen : styles.hamburgerTopClosed }></span>
            <span className={isOpen ? styles.hamburgerMiddleOpen : styles.hamburgerMiddleClosed }></span>
            <span className={isOpen ? styles.hamburgerBottomOpen : styles.hamburgerBottomClosed }></span>
        </button>
        <div className={styles.logo}>
            <Link href="/">
              <Image 
                  src={logo}
                  height={25}
                  alt="Company Ltd Logo"
              />            
          </Link>
        </div>
          
          <div className={styles.links}>
              {navlinks.map((navlink) => (
                  <Link 
                      key={navlink.id}
                      href={navlink.url}
                      className={styles.link}
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
          
          {/* The hamburger menu */}
          {isOpen && 
          <div className={styles.hamburgerMenu}>
              {navlinks.map((navlink) => (
                  <Link 
                      key={navlink.id}
                      href={navlink.url}
                      className={styles.link}
                      onClick={handleMenuClick}
                  >
                      {navlink.title}
                  </Link>
              ))}
              <Link href="/login">
                  <button 
                      className={styles.login}
                      onClick={handleMenuClick}
                  >
                      Log in
                  </button>
              </Link>
              
          </div>
          }
                
          
      </nav>

      
    );
  };
  
  export default Navbar;