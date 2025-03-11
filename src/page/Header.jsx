import React from "react";
import { Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { MdOutlineAddBox } from "react-icons/md";
import User from "../components/User";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "../components/CartStatus";

export default function Header() {
  const {user, signInWithGoogle, logout} = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to="/" className='flex items-center text-4xl text-red-400'>
        <HiMiniShoppingBag />
        <h1>SungEun & Co.</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to="/products">Products</Link>
        {user && <Link to="/carts"><CartStatus/></Link> }
        {user && user.isAdmin && 
        <Link to="/products/new">
          <MdOutlineAddBox />
        </Link>
      }
        {!user && <Button text ="Login" onClick={signInWithGoogle}/>}
        {user && <User user={user} />}
        {user && <Button text = "Logout" onClick={logout}/>}
      </nav>
    </header>
  );
}
