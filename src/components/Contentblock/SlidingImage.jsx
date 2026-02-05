
import React, { useEffect, useState } from 'react';
import './Contentblock.css';

import img1 from '../../assets/s1-1.jpg';
import img2 from '../../assets/s2-2.jpg';
import img3 from '../../assets/s3-3.jpg';
import img4 from '../../assets/s4-4.jpg';
import img5 from '../../assets/s5-5.jpg';
import img6 from '../../assets/s6-6.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const SlidingImage = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sliding-image-container">
            <img src={images[index]} alt="Showcase" className="sliding-image" />
        </div>
    );
};

export default SlidingImage;
