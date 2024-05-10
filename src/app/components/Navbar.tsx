"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "./Avatar";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const router = useRouter();

  const [showLoginForm, setshowLoginForm] = useState(false);

  const handleAvatarClick = async () => {
    const token = await localStorage.getItem('token');
    // Check if the user is logged in based on the token
    if (token) {
      router.push('/profile');
    } else {
      setshowLoginForm(true);
    }
  };

  return (
    <div className="navbar bg-base-100 justify-center items-start">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Explore Courses</a></li>
            <li><a>My Courses</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-main">/Courzinger</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li><a>Explore Courses</a></li>
          <li><a>My Courses</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={handleAvatarClick}
        >
          <Avatar />
        </button>
      </div>
      <LoginModal setOpenModal={setshowLoginForm} openModal={showLoginForm} />
    </div>
  )
};

export default Navbar;
