"use client";
import React from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/redux/firebase/firebaseConfig";
import { getCurrentUserData } from "@/redux/firebase/authService";
import Link from "next/link";
import { CiStar, CiTimer } from "react-icons/ci";

const Library = () => {
  const [library, setLibrary] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksAct, setBooksAct] = useState<any[]>([]);
  const [libraryAct, setLibraryAct] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [durations, setDurations] = useState<Record<string, number>>({});

  useEffect(() => {
    getCurrentUserData()
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!userData?.uid) return;

    const fetchUser = async () => {
      const docRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLibrary(data.Library || []);
        setBooks(data.Books || []);
        console.log("User data:", data);
        console.log("Books field:", data.Books);
        console.log("Library field:", data.Library);
      }
    };

    fetchUser();
  }, [userData]);

  const settingBooks = async () => {
    if (!books?.length) return;

    try {
      const responses = await Promise.all(
        books.map((id) =>
          fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
          ),
        ),
      );

      const data = await Promise.all(responses.map((res) => res.json()));

      setBooksAct(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const settingLibrary = async () => {
    if (!library?.length) return;

    try {
      const results = await Promise.all(
        library.map(async (id) => {
          const res = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
          );

          if (!res.ok) {
            throw new Error(`Failed to fetch book ${id}`);
          }

          return res.json();
        }),
      );

      console.log("Fetched Library Books:", results);
      setLibraryAct(results);
    } catch (error) {
      console.error("Error fetching library books:", error);
    }
  };

  const timer = (type: any) => {
    let minutesLeft: any;
    let secondsLeft: any;
    let time = type;
    minutesLeft = Math.floor(time / 60);
    secondsLeft = Math.floor(time % 60);
    if (minutesLeft.toString().length === 1) {
      minutesLeft = "0" + minutesLeft;
    }
    if (secondsLeft.toString().length === 1) {
      secondsLeft = "0" + secondsLeft;
    }
    return `${minutesLeft}:${secondsLeft}`;
  };

  useEffect(() => {
    settingBooks();
  }, [books]);

  useEffect(() => {
    settingLibrary();
  }, [library]);

  return (
    <div className="wrapper">
      <div className="row">
        <div className="container">
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">{libraryAct.length || '0'} items</div>
          {libraryAct.length !== 0 ? (
            <div className="for-you__recommended--books">
              {libraryAct.map((book) => {
                return (
                  <Link
                    href={`/dashboard/book/${book.id}`}
                    className="for-you__recommended--books-link"
                    key={book.id}
                  >
                    <audio 
                    src={book.audioLink}
                    onLoadedMetadata={(e)=> {
                    const audio = e.currentTarget;
                    setDurations((prev) => ({
                        ...prev,
                        [book.id]: audio.duration,
                    }))
                }}
                    ></audio>
                    {book.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                        Premium
                      </div>
                    )}
                    <figure className="book__image--wrapper" style={{marginBottom: '8px'}}>
                        <img src={book.imageLink} alt="" className="book__image" />
                    </figure>
                    <div className="recommended__book--title">
                        {book.title}
                    </div>
                    <div className="recommended__book--author">{book.author}</div>
                    <div className="recommended__book--sub-title">{book.subTitle}</div>
                    <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                            <div className="recommended__book--details-icon">
                                <CiTimer />
                            </div>
                            <div className="recommended__book--details-text">{timer(durations[book.id])}</div>
                        </div>
                        <div className="recommended__book--details">
                            <div className="recommended__book--details-icon">
                                <CiStar />
                            </div>
                            <div className="recommended__book--details-text">{book.averageRating}</div>
                        </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">
                Save your favorite books!
              </div>
              <div className="finished__books--sub-title">
                When you save a book, it will appear here.
              </div>
            </div>
          )}
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">{booksAct.length || '0'} items</div>
            {booksAct.length !== 0 ? 
            <div className="for-you__recommended--books">
            {booksAct.map((book) => {
                return (
                  <Link
                    href={`/dashboard/book/${book.id}`}
                    className="for-you__recommended--books-link"
                    key={book.id}
                  >
                    <audio 
                    src={book.audioLink}
                    onLoadedMetadata={(e)=> {
                    const audio = e.currentTarget;
                    setDurations((prev) => ({
                        ...prev,
                        [book.id]: audio.duration,
                    }))
                }}
                    ></audio>
                    {book.subscriptionRequired && (
                      <div className="book__pill book__pill--subscription-required">
                        Premium
                      </div>
                    )}
                    <figure className="book__image--wrapper" style={{marginBottom: '8px'}}>
                        <img src={book.imageLink} alt="" className="book__image" />
                    </figure>
                    <div className="recommended__book--title">
                        {book.title}
                    </div>
                    <div className="recommended__book--author">{book.author}</div>
                    <div className="recommended__book--sub-title">{book.subTitle}</div>
                    <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                            <div className="recommended__book--details-icon">
                                <CiTimer />
                            </div>
                            <div className="recommended__book--details-text">{timer(durations[book.id])}</div>
                        </div>
                        <div className="recommended__book--details">
                            <div className="recommended__book--details-icon">
                                <CiStar />
                            </div>
                            <div className="recommended__book--details-text">{book.averageRating}</div>
                        </div>
                    </div>
                  </Link>
                );
              })}
              </div>
            :
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">Done and dusted!</div>
            <div className="finished__books--sub-title">
              When you finish a book, you can find it here later.
            </div>
          </div>
            
        }
        </div>
      </div>
    </div>
  );
};

export default Library;
