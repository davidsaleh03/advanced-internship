'use client'
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from "../../../redux/firebase/firebase";
import { useDispatch } from "react-redux";
import SettingsIn from '@/components/SettingsIn';
import SettingsOut from '@/components/SettingsOut';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const settings = () => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((currentUser) => {
                setUser(currentUser);
            });
    
            return () => unsubscribe(); 
        }, []);
    useEffect(() => {
  if (typeof window !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}, []);
  return (
    <div className="wrapper" data-aos="fade-left">
        <div className="container">
            <div className="row">
                <div className="section__title page__title">
                    Settings
                </div>
                {
                    user
                    ?
                    <SettingsIn />
                    :
                    <SettingsOut />
                }
            </div>
        </div>
    </div>
  )
}

export default settings