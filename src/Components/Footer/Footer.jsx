import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/supermaket.png'
import insta_logo from '../Assets/instagram.png'
import pin_logo from '../Assets/pinterest.png'
import whats_logo from '../Assets/whatsapp.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>FABRIK HUNTER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={insta_logo} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pin_logo} alt="" />
                </div>
            <div className="footer-icons-container">
                <img src={whats_logo} alt="" />
                </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 All Rights Reserved</p>
        </div>
        </div>
  )
}
