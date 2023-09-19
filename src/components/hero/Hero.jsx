"use client"

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import styles from './hero.module.css';
import arrowIcon from "../../../public/Icon_Arrow.svg"
import Link from 'next/link';


const Hero = () => {

    const [heroData, setHeroData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Put the fetch within a useEffect so that it is fetched once the component mounts. This should occur just once.

    useEffect(() => {

        const apiUrl = "https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details";

        // Fetching the data from the REST Endpoint, using fetch to make a GET request:

        fetch(apiUrl)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network issues encountered")
                }
                return response.json(); // Handle the response and parse it as JSON
            })
            .then((result) => { // Store the fetched data in state, and set isLoading to false
                setHeroData(result);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error while fetching data: ", error);
                setIsLoading(false);
            });
    }, []);
    
  return (
    <div className={styles.container}>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            
            <div className="heroWrapper">                
                
                {/* Code for Swiper carousel */}
                <Swiper
                    pagination={{
                    dynamicBullets: true,
                    clickable: true
                    }}
                    autoplay={{delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    modules={[Pagination, Navigation, Autoplay, EffectFade]}
                    loop={true}
                    effect='fade'
                    speed={1200}
                    slidesPerView={1.0}
                    navigation={{
                        nextEl: ".swiperButtonNext",
                        prevEl: ".swiperButtonBack",
                        disabledClass: ".swiperButtonDisabled"
                    }}
                    className={styles.carouselContainer}
                >                    
                    <div className="swiperButton swiperButtonNext">
                        <Image src={arrowIcon} height={10} alt="right-pointing arrow icon"/>
                    </div>
                    <div className="swiperButton swiperButtonBack">
                        <Image src={arrowIcon} height={10} alt="left-pointing arrow icon"/>
                    </div>
                    {heroData.Details.map((detail, index) => (
                        <SwiperSlide key={index}>
                        <div className={styles.heroContent}>
                            <div className="gradient"></div>
                            <div className="bannerContentBox">
                                <h1 className="bannerTitle">{detail.Title}</h1>
                                <p className='bannerSubtitle'>{detail.Subtitle}</p>
                                <Link href="/contact-us" className={styles.heroLink}>
                                    <button className='submitButton' type='button'>Contact Us</button>
                                </Link>
                                
                            </div>
                                
                            <Image 
                                src={detail.ImageUrl}
                                height={0}
                                width={0}
                                sizes='100vw'
                                alt="Hero banner image"
                                className={index === 0 ? styles.heroImage1 : index === 1 ? styles.heroImage2 : styles.heroImage3}
                            />                          
                        </div>                         
                    </SwiperSlide>                        
                    ))}                        
                    
                </Swiper>                
            </div>
            
        )}       
    </div>
  )
}

export default Hero;