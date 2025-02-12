import './App.css';
import React from 'react';
import { initializeDigitalData } from "./dataLayer/digitalDataInitializer.js";
import { useDigitalDataUpdater } from "./dataLayer/useDigitalDataUpdater.js";
import { initializeSalesforceInteractions } from './utils/salesforceInteractions';
import Navbar from './Components/Navbar/Navbar';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShopCategory } from './Pages/ShopCategory';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/menbanner.jpg'
import women_banner from './Components/Assets/womenbanner.jpg'
import kids_banner from './Components/Assets/kidsbanner.jpg'


const AppContent = () => {
  useDigitalDataUpdater(); // Safe to use here because it's inside BrowserRouter
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  React.useEffect(() => {
    initializeDigitalData();
    initializeSalesforceInteractions();
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
