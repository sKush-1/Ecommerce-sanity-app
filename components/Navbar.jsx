import { React, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '@/lib/utils';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [user, setUser] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('user');
      setUser(JSON.parse(storedData))
    }
  }, []);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Audio Wave</Link>
      </p>

      <Link href="/trending">Trending</Link>
      <Link href="/wishlist">Wishlist</Link>
      <SearchBar/>

      <div>
        {user ? (
          <div className="dropdown">
            <button className="dropbtn">{user?.given_name}</button>
            <div className="dropdown-content">
              <Link href="/user-profile">My Profile</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/">Logout</Link>
            </div>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onError={() => console.log('error')}
          />
        )}
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
