import React from 'react'
import { useEffect, useState } from "react";
import { getCurrentUserData } from '@/redux/firebase/authService';

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
        <div className="settings__text">{userData?.membershipStatus}</div>
        <div className="btn settings__upgrade--btn">Upgrade to Premium</div>
      </div>
      <div className="setting__content">
        <div className="settings__sub--title">Email</div>
        <div className="settings__text">{userData?.email}</div>
      </div>
    </>
  );
};

export default SettingsIn

