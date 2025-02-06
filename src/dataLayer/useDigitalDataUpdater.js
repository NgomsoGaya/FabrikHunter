import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {updateCategoryView} from './updateCategoryView';
import {updateProductView} from './updateProductView';

export const useDigitalDataUpdater = () => {
  const location = useLocation();
  const { productId } = useParams();

  useEffect(() => {
    const updateDigitalData = () => {
      const path = location.pathname;
      const pageName = path.replace(/\//g, ':').substring(1) || 'home';

      // Update page name
      window.digitalData.page.name = `eco-store:${pageName}`;
      
      // Update category based on URL
      let category = '';
      if (path.includes('mens')) category = 'men';
      else if (path.includes('womens')) category = 'women';
      else if (path.includes('kids')) category = 'kids';
      
      if (category) {
        updateCategoryView(category);
      }

      // If we're on a product page, update product view
      if (productId) {
        updateProductView(productId);
      }
    };

    updateDigitalData();
  }, [location, productId]);
};