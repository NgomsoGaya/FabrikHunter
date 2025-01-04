import React from 'react';
import { Hero } from '../Components/Hero/Hero.jsx';
import Popular  from '../Components/Popular/Popular.jsx';
import { Offers } from '../Components/Offers/Offers.jsx';

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
    </div>
  );
};
