import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import Cart from './../../pages/Cart/Cart';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }

  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home") } className={menu ==="home"?"active":""}>home</Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu") } className={menu ==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app") } className={menu ==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us") } className={menu ==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
          <div className="navbar-search-container">
            <input type="text" placeholder="Search dishes..." className="navbar-search-input" />
            <img src={assets.search_icon} alt="" className="navbar-search-icon" />
          </div>
          <div className="navbar-search-icon-cart">
            <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}> </div>
          </div>
          {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
          :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
        </div>
      </div>

      {/* bottom buttons on mobile */}
      <div className="mobile-bottom-nav">
        <Link to="/" className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <p>Home</p>
        </Link>
        <a href="#explore-menu" className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
          <p>Menu</p>
        </a>
        <Link to="/cart" className={menu === "cart" ? "active" : ""} onClick={() => setMenu("cart")}>
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          <p>Cart</p>
        </Link>

        <Link to="/myorders" className={menu === "orders" ? "active" : ""} onClick={() => setMenu("orders")}>
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="21 8 21 21 3 21 3 8"/>
            <rect width="22" height="5" x="1" y="3"/>
            <line x1="10" y1="12" x2="14" y2="12"/>
          </svg>
          <p>Orders</p>
        </Link>
      </div>

    </div>
  )
}

export default Navbar
