'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import '../styles.css'
import { FaHome, FaBookmark, FaPenAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import Image from "next/image";
import Logo from '../assets/logo.png'
import RotatingFonts from "./RotatingFonts";
import { logout } from "@/redux/firebase/authService";
import { auth } from "../redux/firebase/firebase";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useSelector } from "react-redux";
import { closeSide } from "@/redux/sidebarSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const [user, setUser] = useState<User | null>(null);
    const [tab, setTab] = useState<String | null>(null);
    const isOpen = useSelector((state: any) => state.side.isOpen);

    useEffect(() => {
  if (pathname.endsWith('/dashboard/for-you')) {
    setTab('one');
  } else if (pathname.endsWith('/dashboard/library')) {
    setTab('two');
  } else if (pathname.endsWith('/dashboard/settings')) {
    setTab('three');
  } else {
    setTab(null);
  }
}, [pathname]);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); 
    }, []);

  return (
    <>
    <div className={`sidebar__overlay ${!isOpen && 'sidebar__overlay--hidden'}`} onClick={() => dispatch(closeSide())}></div>
    <div className={`sidebar ${isOpen && 'sidebar--opened'}`}>
      <div className="sidebar__logo">
        <Image src={Logo} alt="logo"/>
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <Link href="/dashboard/for-you" className="sidebar__link--wrapper" onClick={() => dispatch(closeSide())}>
            <div className={`sidebar__link--line ${tab === 'one' && 'active--tab'}`}></div>
            <div className="sidebar__icon--wrapper">
              <FaHome />
            </div>
            <div className="sidebar__link--text">For you</div>
          </Link>
          <Link href="/dashboard/library" className="sidebar__link--wrapper" onClick={() => dispatch(closeSide())}>
            <div className={`sidebar__link--line ${tab === 'two' && 'active--tab'}`}></div>
            <div className="sidebar__icon--wrapper">
              <FaBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </Link>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaPenAlt />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaMagnifyingGlass />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
          {pathname.startsWith('/dashboard/player/') && <RotatingFonts />}
        </div>
        <div className="sidebar__bottom">
          <Link href="/dashboard/settings" className="sidebar__link--wrapper" onClick={() => dispatch(closeSide())}>
            <div className={`sidebar__link--line ${tab === 'three' && 'active--tab'}`}></div>
            <div className="sidebar__icon--wrapper">
              <IoIosSettings />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className={`sidebar__link--line`}></div>
            <div className="sidebar__icon--wrapper">
              <FaRegQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
          {
            user
            ?
          <div className="sidebar__link--wrapper" onClick={logout}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <MdLogout />
            </div>
            <div className="sidebar__link--text">Logout</div>
          </div>
          :
          <div className="sidebar__link--wrapper" onClick={() => dispatch(openModal())}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <MdLogin />
            </div>
            <div className="sidebar__link--text">Login</div>
          </div>
          }
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
