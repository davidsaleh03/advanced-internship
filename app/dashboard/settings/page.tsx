'use client'
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from "../../../redux/firebase/firebase";
import { useDispatch } from "react-redux";
import SettingsIn from '@/components/SettingsIn';
import SettingsOut from '@/components/SettingsOut';


const settings = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((currentUser) => {
                setUser(currentUser);
            });
    
            return () => unsubscribe(); 
        }, []);
  return (
    <div className="wrapper">
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