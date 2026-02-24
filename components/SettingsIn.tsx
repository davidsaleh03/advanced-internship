import React from 'react'
import { useEffect, useState } from "react";
import { getCurrentUserData } from '@/redux/firebase/authService';
import Link from 'next/link';
import Loading from './Loading';

const SettingsIn = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUserData()
      .then((data) => setUserData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="setting__content">
        <div className="settings__sub--title">Your Subscription Plan</div>
        <div className="settings__text">{userData?.membershipStatus || <Loading />}</div>
        <Link href="/choose-plan">
        {
          userData 
          ?
          <div className="btn settings__upgrade--btn">Upgrade to Premium</div>
          :
          <div className="btn settings__upgrade--btn"><Loading /></div>
        }
        </Link>
      </div>
      <div className="setting__content">
        <div className="settings__sub--title">Email</div>
        <div className="settings__text">{userData?.email || <Loading />}</div>
      </div>
    </>
  );
};

export default SettingsIn

