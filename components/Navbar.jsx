import { React, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { MdManageSearch } from "react-icons/md";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '@/lib/utils';
import SearchBar from './SearchBar';

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [user, setuser] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('user');
      setuser(JSON.parse(storedData))
    }
  }, []);


  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Audio Wave</Link>
      </p>

      <a href='/trending'>Trending</a>
      <a href='/trending'>Wishlist</a>
      <SearchBar/>
        


      <div>
        { user ? (
          // <div> <a href='/profile'> User Profile</a> </div>
          <div class="dropdown">
  <button class="dropbtn">{user?.given_name}</button>
  <div class="dropdown-content">
    <a href="user-profile">My Profile</a>
    <a href="orders">Orders</a>
    <a href="whishlist">Wishlist</a>
    <a href='/'>Logout</a>
  </div>
</div>
        ):
        <GoogleLogin
        onSuccess={(response) => createOrGetUser(response)}
        onError={() => console.log('error')}
        />

        
        }
      </div>




      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar