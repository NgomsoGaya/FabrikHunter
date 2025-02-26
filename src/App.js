import './App.css';
import React from 'react';
import { initializeDigitalData } from "./dataLayer/digitalDataInitializer.js";
import { useDigitalDataUpdater } from "./dataLayer/useDigitalDataUpdater.js";
import Navbar from './Components/Navbar/Navbar';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import { ShopCategory } from './Pages/ShopCategory';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/menbanner.jpg'
import women_banner from './Components/Assets/womenbanner.jpg'
import kids_banner from './Components/Assets/kidsbanner.jpg'

// New component for tracking virtual pageviews
const PageViewTracker = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // This will run on every route change
    if (window._satellite && window.digitalData) {
      // Get the current page name based on the path
      let pageName = "home";
      if (location.pathname.includes('/mens')) pageName = "mens";
      else if (location.pathname.includes('/womens')) pageName = "womens";
      else if (location.pathname.includes('/kids')) pageName = "kids";
      else if (location.pathname.includes('/cart')) pageName = "cart";
      else if (location.pathname.includes('/login')) pageName = "login";
      else if (location.pathname.includes('/product/')) {
        // For product pages, you might want to include the product ID
        const productId = location.pathname.split('/').pop();
        pageName = `product_${productId}`;
      }
      
      // Update the digitalData object with page info if needed
      // (This may be redundant if useDigitalDataUpdater already does this)
      window.digitalData.page = {
        ...window.digitalData.page,
        name: pageName,
        category: location.pathname
      };
      
      // Trigger a Direct Call Rule in Adobe Launch
      console.log(`Tracking virtual pageview: ${pageName}`);
      window._satellite.track("virtualPageView");
    }
  }, [location]);
  
  return null; // This component doesn't render anything visible
};

const AppContent = () => {
  useDigitalDataUpdater(); // Your existing hook for data layer updates
  
  return (
    <div>
      <Navbar />
      <PageViewTracker /> {/* Add the tracker component here */}
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
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;