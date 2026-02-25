'use client'
import Link from "next/link";
import React, { useState } from "react";
import { CiStar, CiTimer } from "react-icons/ci";

interface ReccomendedProps {
  dataSet: any[];
  loadingSet: boolean;
}

const Reccomended: React.FC<ReccomendedProps> = ({ dataSet, loadingSet }) => {
  const Reccomended = dataSet ?? [];

const [durations, setDurations] = useState<Record<string, number>>({});



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

  return (
    <>
      {loadingSet
        ? [1, 2, 3, 4, 5, 6].map((_, i) => {
            return (
              <div className="for-you__recommended--books-link" key={i}>
                <div
                  className="skeleton"
                  style={{ width: "172px", height: "172px", marginBottom: '8px' }}
                ></div>
                <div
                  className="skeleton"
                  style={{ width: "168px", height: "22px", marginBottom: '8px' }}
                ></div>
                <div
                  className="skeleton"
                  style={{ width: "90px", height: "18px", marginBottom: '8px' }}
                ></div>
                <div
                  className="skeleton"
                  style={{ width: "168px", height: "38px", marginBottom: '8px' }}
                ></div>
                <div className="recommended__book--details-wrapper">
                  <div
                    className="skeleton"
                    style={{ width: "108px", height: "24px" }}
                  ></div>
                </div>
              </div>
            );
          })
        : Reccomended?.map((book) => {
            return (
              <Link
                href={`/dashboard/book/${book.id}`}
                key={book.id}
                className="for-you__recommended--books-link"
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
                <figure
                  className="book__image--wrapper"
                  style={{ marginBottom: "8px" }}
                >
                  <img src={book.imageLink} className="book__image" />
                </figure>
                <div className="recommended__book--title">{book.title}</div>
                <div className="recommended__book--author">{book.author}</div>
                <div className="recommended__book--sub-title">
                  {book?.subTitle}
                </div>
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
                    <div className="recommended__book--details-text">
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
    </>
  );
};

export default Reccomended;
