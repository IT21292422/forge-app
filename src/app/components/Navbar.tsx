"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "../stores/user.store";
import Avatar from "./Avatar";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleAvatarClick = async () => {
    // localStorage.removeItem('token')

    const token = await localStorage.getItem('token');
    // Check if the user is logged in based on the token

    if (token) {
      router.push('/profile');
    } else {
      setShowLoginForm(true);
    }
  };

  const role = useUserStore(state => state.user ? state.user.role : '')

  return (
    <div className="navbar bg-base-100 justify-center items-start">
      <div className="navbar-start">
        {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Explore Courses</a></li>
            <li><a>My Courses</a></li>
          </ul>
        </div> */}
        <button onClick={() => router.push('/learner')} className="btn btn-ghost text-xl text-main">
          /Courzinger
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li><Link href={'/learner/allcourse'} className={pathname === '/learner/allcourse' ? "underline text-blue-800 focus:text-blue-800" : ""}>
            Explore Courses
          </Link>
          </li>
          <li><Link href={'/learner/mycourse'} className={pathname === '/learner/mycourse' ? "underline text-blue-800 focus:text-blue-800" : ""}>

            My Courses
          </Link>
          </li>
          {role === 'admin' ?
            <li><Link href={'/admin'} className={pathname === '/admin' ? "underline text-blue-800 focus:text-blue-800" : ""}>
              Admin
            </Link>
            </li>
            : null}

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
      <LoginModal setOpenModal={setShowLoginForm} openModal={showLoginForm} setOpenSignUpModal={setShowSignUpForm} />
      <SignUpModal setOpenModal={setShowSignUpForm} openModal={showSignUpForm} setOpenLoginModal={setShowLoginForm} />
    </div >
  )
};

export default Navbar;