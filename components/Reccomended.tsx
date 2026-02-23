
import Link from "next/link";
import React from "react";
import { CiStar, CiTimer } from "react-icons/ci";

interface ReccomendedProps {
  dataSet: any[];
  loadingSet: boolean;
}

const Reccomended: React.FC<ReccomendedProps> = ({ dataSet, loadingSet }) => {
  const Reccomended = dataSet ?? [];

  return (
    <>
      {loadingSet
        ? [1, 2, 3, 4, 5, 6].map((_, i) => {
            return (
              <div className="for-you__recommended--books-link">
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
                    <div className="recommended__book--details-text">03:24</div>
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
