"use client";
import React, { useState } from "react";
import { FaGoogle, FaUser } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import google from "../assets/google.png";
import Image from "next/image";
import { signInWithGoogle } from "@/redux/firebase/authService";
import { register, login, resetPassword } from "@/redux/firebase/authService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import { ImSpinner2 } from "react-icons/im";

const Login = () => {
  const [loading, setLoading] = useState("0");
  const [reset, setReset] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal.isOpen);
  const handleGoogleSignIn = async () => {
    try {
        setError(null);
      const user = await signInWithGoogle();
      console.log("Logged in user:", user);
      setLoading("0");
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading("0");
    }
  };

  const handleGuest = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setError(null);
    setLoading("1")
    await login('david123@david.com', 'david123');
    dispatch(closeModal());
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading("0");
  }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setError(null);
    setLoading("5");
    await register(email, password);
    dispatch(closeModal());
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading("0");
  }
};
  const handleReset = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setError(null);
    setLoading("6");
    await resetPassword(email);
    dispatch(closeModal());
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading("0");
  }
};
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setError(null);
    setLoading("3");
    await login(email, password);
    dispatch(closeModal());
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading("0");
  }
};

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="wrapper wrapper__full">
      {modal && (
        <>
          <div className="sidebar__overlay sidebar__overlay--hidden"></div>
          <div className="auth__wrapper">
            <div className="auth">
                {
                    reset
                    ?
                    <>
                    <div className="auth__content">
                        <div className="auth__title">Reset your password</div>
                        <form className="auth__main--form" onSubmit={handleReset}>
                            <input type="text" className="auth__main--input" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                            <button className="btn">
                                <span>Send reset password link</span>
                            </button>
                        </form>
                    </div>
                    <button className="auth__switch--btn" onClick={() => setReset(false)}>Go to login</button>
       
                    </>
                    :
                    isLogin ? (
                      <>
                        <div className="auth__content">
                          <div className="auth__title">Log in to Summarist</div>
                          {error && <div className="auth__error">{error}</div>}
                          <button
                            className="btn guest__btn--wrapper"
                            onClick={handleGuest}
                          >
                            <figure className="google__icon--mask guest__icon--mask">
                              <FaUser />
                            </figure>
                            {loading === "1" ? (
                              <div className="spinner__icon--wrapper">
                                <ImSpinner2 />
                              </div>
                            ) : (
                              <div>Login as a Guest</div>
                            )}
                          </button>
                          <div className="auth__separator">
                            <span className="auth__separator--text">or</span>
                          </div>
                          <button
                            className="btn google__btn--wrapper"
                            onClick={() => {
                              setLoading("2");
                              handleGoogleSignIn();
                            }}
                          >
                            <figure className="google__icon--mask">
                              <Image src={google} alt="logo" />
                            </figure>
                            {loading === '2' ? (
                              <div className="spinner__icon--wrapper">
                                <ImSpinner2 />
                              </div>
                            )
                            :
                            (
                              <div>Login with Google</div>
                            )}
                          </button>
                          <div className="auth__separator">
                            <span className="auth__separator--text">or</span>
                          </div>
                          <form className="auth__main--form" onSubmit={handleLogin} >
                            <input
                              type="email"
                              className="auth__main--input"
                              placeholder="Email Address"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <input
                              type="password"
                              className="auth__main--input"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {loading === '3' ? (
                              <button className="btn" disabled>
                                <div className="spinner__icon--wrapper">
                                  <ImSpinner2 />
                                </div>
                              </button>
                            ):(
                              <button className="btn">
                                <span>Login</span>
                              </button>
                            )}
                          </form>
                        </div>
                        <div className="auth__forgot--password" onClick={() => setReset(true)}>
                          Forgot your password?
                        </div>
                        <button
                          className="auth__switch--btn"
                          onClick={() => setIsLogin(false)}
                        >
                          Don't have an account?
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="auth__content">
                          <div className="auth__title">Sign up to Summarist</div>
                          {error && <div className="auth__error">{error}</div>}
                          <button
                            className="btn google__btn--wrapper"
                            onClick={() => {
                              setLoading('4');
                              handleGoogleSignIn();
                          }}
                          >
                            <figure className="google__icon--mask">
                              <Image src={google} alt="logo" />
                            </figure>
                            {loading === '4' ? (
                              <div className="spinner__icon--wrapper">
                                <ImSpinner2 />
                              </div>
                            ) : (
                              <div>Sign up with Google</div>
                            )}
                          </button>
                          <div className="auth__separator">
                            <span className="auth__separator--text">or</span>
                          </div>
                          <form className="auth__main--form" onSubmit={handleSubmit}>
                            <input
                              type="email"
                              className="auth__main--input"
                              placeholder="Email Address"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <input
                              type="password"
                              className="auth__main--input"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {loading === '5' ? (
                              <button className="btn" disabled>
                                <div className="spinner__icon--wrapper">
                                  <ImSpinner2 />
                                </div>
                              </button>
                            )
                            :
                            (
                              <button className="btn">
                                <span>Sign up</span>
                              </button>
                            )}
                          </form>
                        </div>
                        <button
                          className="auth__switch--btn"
                          onClick={() => setIsLogin(true)}
                        >
                          Already have an account?
                        </button>
                      </>
                    )}
              <div
                className="auth__close--btn"
                onClick={() => dispatch(closeModal())}
              >
                <HiXMark />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
