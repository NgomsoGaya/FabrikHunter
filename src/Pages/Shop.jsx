import React from 'react';
import { Hero } from '../Components/Hero/Hero.jsx';
import Popular  from '../Components/Popular/Popular.jsx'; // Ensure the component starts with an uppercase letter

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
    </div>
  );
};
