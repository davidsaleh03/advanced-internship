import Link from "next/link";
import '../styles.css'
import { FaHome, FaBookmark, FaPenAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import Logo from '../assets/logo.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Image src={Logo} alt="logo"/>
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <Link href="/dashboard/for-you" className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaHome />
            </div>
            <div className="sidebar__link--text">For you</div>
          </Link>
          <Link href="/library" className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
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
        </div>
        <div className="sidebar__bottom">
          <Link href="/settings" className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <IoIosSettings />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaRegQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
          <div className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <MdLogout />
            </div>
            <div className="sidebar__link--text">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
