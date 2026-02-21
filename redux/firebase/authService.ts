"use client"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";



export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};


export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};


export const logout = async () => {
  return await signOut(auth);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};