import Image from 'next/image'
import React from 'react'
import login from '../assets/login.png'
import { useDispatch } from "react-redux";
import { openModal } from '@/redux/modalSlice';

const SettingsOut = () => {
    const dispatch = useDispatch();
  return (
    <div className="settings__login--wrapper">
        <Image alt='image'src={login} height={712} width={1033} />
        <div className="settings__login--text">Log in to your account to see your details.</div>
        <button className="btn settings__login--btn" onClick={() => dispatch(openModal())}>Login</button>
    </div>
  )
}

export default SettingsOut