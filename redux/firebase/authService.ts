"use client"; 
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    membershipStatus: "Basic",
    Books: [],
    Library: [],
    createdAt: new Date(),
  });

  return userCredential;
};



export const getCurrentUserData = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            resolve(userSnap.data());
          } else {
            resolve(null); 
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
      unsubscribe(); 
    });
  });
};

export const addBookToUser = async (userId: string, book: any) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      Books: arrayUnion(book),
    });

    console.log("Book added successfully!");
  } catch (error) {
    console.error("Error adding book: ", error);
  }
};

export const addBookToLibrary = async (userId: string, book: any) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      Library: arrayUnion(book),
    });

    console.log("Book added successfully!");
  } catch (error) {
    console.error("Error adding book: ", error);
  }
};

export const removeBookFromLibrary = async (userId: string, book: any) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      Library: arrayRemove(book),
    });

    console.log("Book removed successfully!");
  } catch (error) {
    console.error("Error removing book: ", error);
  }
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
}

export const logout = async () => {
  return await signOut(auth);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        membershipStatus: "Basic",
        Books: [],
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};