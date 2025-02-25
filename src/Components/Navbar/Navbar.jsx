import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

import logo from '../Assets/supermaket.png'
import cart_icon from '../Assets/shopping-cart.png'

export default function Navbar() {
    const [menu, setMenu] = useState("shop");
    
  return (
    <div className='navbar' id='navbar-zone'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>FabrikHunter</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu === "shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu === "mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu === "womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu === "kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        <Link to='https://mc953zsyjzkqnx9q59-z6dk4tfn4.pub.sfmc-content.com/2ix0pcpvfxg'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
        </div>
  )
}
