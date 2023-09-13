"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Hero = () => {

    const [heroData, setHeroData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Put the fetch within a useEffect so that it is fetched once the page loads. This should occur just once.

    useEffect(() => {

        const apiUrl = "https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details";

        // Fetching the data from the REST Endpoint:

        fetch(apiUrl)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network issues encountered")
                }
                return response.json();
            })
            .then((result) => { // Store the fetched data in state, and set isLoading to false
                setHeroData(result);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error while fetching data: ", error);
                setIsLoading(false);
            });
    }, [])

  return (
    <div>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <div>
                {heroData.Details.map((detail, index) => (
                    <div key={index}>
                        <h1>{detail.Title}</h1>
                        <h3>{detail.Subtitle}</h3>
                        <Image 
                            src={detail.ImageUrl}
                            height={100}
                            width={100}
                            alt="slider"
                        />
                    </div>
                ))};
            </div>
        )};        
    </div>
  )
}

export default Hero;