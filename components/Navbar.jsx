import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { MdManageSearch } from "react-icons/md";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Audio Wave</Link>
      </p>

      <a href='/trending'>Trending</a>
      <a href='/trending'>Wishlist</a>
      <div className='search-bar'>
        <input type="text" placeholder="Search.." />
        <MdManageSearch size={30} /></div>


      <a href='/login'>Login</a>




      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar