import React, { useState } from 'react'
import { FaGoogle, FaUser } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import google from '../assets/google.png'
import Image from 'next/image'
import { signInWithGoogle } from "@/redux/firebase/authService";
import { register, login } from "@/redux/firebase/authService";

type LoginProps = {
modal: boolean;
setModal: Function;
}

const Login: React.FC<LoginProps> = ({ modal, setModal }) => {
    const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Logged in user:", user);
      setModal(false); 
    } catch (err) {
      console.error("Google Sign-In Error:", err);
    }
  };
  
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="wrapper wrapper__full">
        {
            modal 
            &&
            <>
        <div className="sidebar__overlay sidebar__overlay--hidden"></div>
        <div className="auth__wrapper">
            <div className="auth">
                {
                    isLogin 
                    ?
                    <>
                <div className="auth__content">
                    <div className="auth__title">Log in to Summarist</div>
                    <button className="btn guest__btn--wrapper">
                        <figure className="google__icon--mask guest__icon--mask">
                            <FaUser />
                        </figure>
                        <div>Login as a Guest</div>
                    </button>
                    <div className="auth__separator">
                        <span className="auth__separator--text">or</span>
                    </div>
                    <button className="btn google__btn--wrapper" onClick={handleGoogleSignIn}>
                        <figure className="google__icon--mask">
                            <Image src={google} alt="logo" />
                        </figure>
                        <div >Login with Google</div>
                    </button>
                    <div className="auth__separator">
                        <span className="auth__separator--text">or</span>
                    </div>
                    <form className="auth__main--form">
                        <input type="email" className="auth__main--input" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" className="auth__main--input" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        <button className="btn" onClick={() => login(email, password)}>
                            <span>Login</span>
                        </button>
                    </form>
                </div>
                <div className="auth__forgot--password">Forgot your password?</div>
                <button className="auth__switch--btn" onClick={() => setIsLogin(false)}>Don't have an account?</button>
                </>
                :
                <>

                <div className="auth__content">
                    <div className="auth__title">Sign up to Summarist</div>
                    <button className="btn google__btn--wrapper">
                        <figure className="google__icon--mask"><FaGoogle /></figure>
                        <div>Login with Google</div>
                    </button>
                    <div className="auth__separator">
                        <span className="auth__separator--text">or</span>
                    </div>
                    <form className="auth__main--form">
                        <input type="email" className="auth__main--input" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" className="auth__main--input" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        <button className="btn" onClick={() => register(email, password)}>
                            <span>Sign up</span>
                        </button>
                    </form>
                </div>
                <button className="auth__switch--btn" onClick={() => setIsLogin(true)}>Already have an account?</button>
                </>
                }
                <div className="auth__close--btn" onClick={() => setModal(false)}>
                    <HiXMark />
                </div>
            </div>
        </div>
            </>
        }
    </div>
  )
}

export default Login