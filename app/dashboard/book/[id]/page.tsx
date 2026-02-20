
'use client'
import { useGetBookQuery } from "@/redux/reccomenedSlice";
import { useParams } from "next/navigation";
import React from "react";
import { CiBookmark, CiClock1, CiStar } from "react-icons/ci";
import { FaReadme } from "react-icons/fa";
import { HiOutlineLightBulb, HiOutlineMicrophone } from "react-icons/hi2";
import { TiMicrophoneOutline } from "react-icons/ti";


const Book = () => {
     const params = useParams();
  const id = params?.id as string;

  const { data } = useGetBookQuery({ id });
  const bookInfo = data;

  return (
    <div className="wrapper">
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">{bookInfo?.title}</div>
              <div className="inner-book__author">{bookInfo?.author}</div>
              <div className="inner-book__sub--title">{bookInfo?.subTitle}</div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><CiStar /></div>
                    <div className="inner-book__overall--rating">{bookInfo?.averageRating} ({bookInfo?.totalRating} Ratings)</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><CiClock1 /></div>
                    <div className="inner-book__duration">03:41</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><HiOutlineMicrophone /></div>
                    <div className="inner-book__type">{bookInfo?.type}</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><HiOutlineLightBulb /></div>
                    <div className="inner-book__key--ideas">{bookInfo?.keyIdeas} Key Ideas</div>
                  </div>
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
                <button className="inner-book__read--btn">
                  <div className="inner-book__read--icon">
                    <FaReadme />
                  </div>
                  <div className="inner-book__read--text">Read</div>
                </button>
                <button className="inner-book__read--btn">
                  <div className="inner-book__read--icon">
                    <TiMicrophoneOutline />
                  </div>
                  <div className="inner-book__read--text">Listen</div>
                </button>
              </div>
              <div className="inner-book__bookmark">
                <div className="inner-book__bookmark--icon">
                  <CiBookmark />
                </div>
                <div className="inner-book__bookmark--text">
                  Add title to My Library
                </div>
              </div>
              <div className="inner-book__secondary--title">
                What's it about?
              </div>
              <div className="inner-book__tags--wrapper">
                {
                  bookInfo?.tags.map((tag, index) => (
                  <div className="inner-book__tag" key={index}>{tag}</div>
                  ))
                }
              </div>
              <div className="inner-book__book--description">{bookInfo?.bookDescription}</div>
              <h2 className="inner-book__secondary--title">About the author</h2>
              <div className="inner-book__author--description">{bookInfo?.authorDescription}</div>
            </div>
            <div className="inner-book--img-wrapper">
              <figure className="book__image--wrapper image--wrapper--3">
                <img src={bookInfo?.imageLink} alt="" className="book__image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
