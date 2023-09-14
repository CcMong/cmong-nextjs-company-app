"use client"

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import styles from './hero.module.css';
import testimage from "../../../public/carousel_1.jpg"
import arrowIcon from "../../../public/Icon_Arrow.svg"


// initialise swiper modules
// SwiperCore.use([Pagination, Autoplay]);


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
            // <div>
            //     {heroData.Details.map((detail, index) => (
            //         <div key={index}>
            //             <h1>{detail.Title}</h1>
            //             <h3>{detail.Subtitle}</h3>
            //             <Image 
            //                 src={detail.ImageUrl}
            //                 height={100}
            //                 width={100}
            //                 alt="slider"
            //             />
            //         </div>
            //     ))}
            // </div>
            <div className={styles.experiment}>
                <div className={`${styles.swiperButton} ${styles.swiperButtonNext}`}>
                    <Image src={arrowIcon} height={10}/>
                </div>
                <div className={`${styles.swiperButton} ${styles.swiperButtonBack}`}>
                    <Image src={arrowIcon} height={10}/>
                </div>
                <Swiper
                    pagination={{
                    dynamicBullets: true,
                    clickable: true
                    }}
                    autoplay={{delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    modules={[Pagination, Navigation, Autoplay]}
                    loop={true}
                    slidesPerView={1.0}
                    navigation={{
                        nextEl: `${styles.swiperButtonNext}`,
                        prevEl: `${styles.swiperButtonBack}`,
                        disabledClass: `${styles.swiperButtonDisabled}`
                    }}
                    className={styles.carouselContainer}
                >
                    {/* {heroData.Details.map((detail) => (
                        <SwiperSlide>
                            <Image 
                                src={detail.ImageUrl}
                                height={0}
                                width={0}
                                sizes='100vw'
                                className={styles.heroImage}
                            />
                        </SwiperSlide>
                    ))} */}

                        <SwiperSlide>
                            <div className={styles.heroContent}>
                                <Image 
                                    src={heroData.Details[0].ImageUrl}
                                    height={0}
                                    width={0}
                                    sizes='100vw'
                                    className={styles.heroImage1}
                                />
                                {/* <div className={styles.gradient}></div> */}
                            </div>
                            
                            {/* <div className={styles.bannerText}>
                                <h1>{heroData.Details[0].Title}</h1>
                            </div> */}
                            
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className={styles.heroContent}>
                                <Image 
                                    src={heroData.Details[1].ImageUrl}
                                    height={0}
                                    width={0}
                                    sizes='100vw'
                                    className={styles.heroImage2}
                                />
                                {/* <div className={styles.gradient}></div> */}
                            </div>
                        </SwiperSlide>                     
                    
                </Swiper>
                
            </div>
            
        )}       
    </div>
  )
}

export default Hero;