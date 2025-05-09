import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import * as braze from '@braze/web-sdk';

braze.initialize("9bd6172a-c3f7-43db-a903-6d27d739aa66", {
  baseUrl: "sdk.fra-01.braze.eu",
  enableLogging: true,
  enableAutomaticPushRegistration: true,
  enableHtmlInAppMessages: true,
  enableAutomaticSessionTracking: true,
  sessionTimeout: 30,
  enableGeofencing: true,
  geofencingEnabled: true,
  geofencingRegionMonitoringEnabled: true,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
     <App />
  </ShopContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
