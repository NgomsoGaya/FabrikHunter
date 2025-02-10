import React, { useEffect } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hello.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/banner2.jpg';

export const Hero = () => {
  
  useEffect(() => {
    const img = document.querySelector('.hero-img');
    if (img) {
      img.onload = () => {
        console.log('Hero image loaded:', img.src);
      };
    }
  }, []);

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img className='hero-img' src={hero_image} alt="Hero Banner" />
      </div>
    </div>
  );
};
