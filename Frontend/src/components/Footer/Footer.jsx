import React from 'react'
import './Footer.css'
import { assets } from './../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""/>
                <p>VitaMeal brings you the finest Nigerian and international cuisine delivered fresh to your doorstep. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                   <li>+2349031753151</li> 
                   <li>emmanuelchideraa9@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright"> @D3R4 2025 </p>
      
    </div>
  )
}

export default Footer
