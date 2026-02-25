
'use client'
import { addBookToLibrary, getCurrentUserData, removeBookFromLibrary } from "@/redux/firebase/authService";
import { openModal } from "@/redux/modalSlice";
import { useGetBookQuery } from "@/redux/reccomenedSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiClock1, CiStar } from "react-icons/ci";
import { FaBookmark, FaReadme, FaRegBookmark } from "react-icons/fa";
import { HiOutlineLightBulb, HiOutlineMicrophone } from "react-icons/hi2";
import { TiMicrophoneOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";


const Book = () => {
     const params = useParams();
     const dispatch = useDispatch();
     const router = useRouter();
     const audioRef = useRef<HTMLAudioElement>(null);
  const id = params?.id as string;
   const [userData, setUserData] = useState<any>(null);
   const [libStatus, setLibStatus] = useState(false);
   const [duration, setDuration] = useState(0);

  const { data, isLoading } = useGetBookQuery({ id });
  const bookInfo = data;

  useEffect(() => {
        getCurrentUserData()
          .then((data) => setUserData(data))
          .catch((err) => console.error(err))
      }, []);

  const handleLibrary = async () => {
  if (!userData?.uid ) {
    dispatch(openModal())
    return
  };

  try {
    if (libStatus) {
      await removeBookFromLibrary(userData.uid, data?.id);
      setLibStatus(false);
    } else {
      await addBookToLibrary(userData.uid, data?.id);
      setLibStatus(true);
    }
  } catch (error) {
    console.error("Library update failed:", error);
  }
};

const handleNavigateToPlayer = () => {
if (!userData?.uid || !data?.id) {
  dispatch(openModal())
  return
}
else if (userData.membershipStatus === 'Basic' && bookInfo?.subscriptionRequired) {
  router.push('/choose-plan')
  return
}
router.push(`/dashboard/player/${bookInfo?.id}`)
}

const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration); 
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

  return (
    <div className="wrapper">
      <div className="row">
        {
          isLoading
          ?
        <>
        <div className="container">
          <div className="inner__book--skeleton">
            <div className="inner__book--skeleton-content">
              <div className="skeleton" style={{width:'70%', height:'32px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'40%', height:'32px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'100%', height:'32px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'45%', height:'64px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'50%', height:'32px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'20%', height:'32px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'50%', height:'64px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'80%', height:'180px', marginBottom:'16px'}}></div>
              <div className="skeleton" style={{width:'80%', height:'268px'}}></div>
            </div>
            <div className="inner__book--skeleton-img">
              <div className="skeleton" style={{width:'300px', height:'300px', marginBottom:'16px'}}></div>
            </div>
          </div>
        </div>
        </>
        :
        <>
        <audio src={bookInfo?.audioLink} ref={audioRef} onLoadedMetadata={handleLoadedMetadata}></audio>
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
                    <div className="inner-book__duration">{timer(duration)}</div>
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
           
                <button className="inner-book__read--btn" onClick={handleNavigateToPlayer}>
                  <div className="inner-book__read--icon">
                    <FaReadme />
                  </div>
                  <div className="inner-book__read--text">Read</div>
                </button>

                <button className="inner-book__read--btn" onClick={handleNavigateToPlayer}>
                  <div className="inner-book__read--icon">
                    <TiMicrophoneOutline />
                  </div>
                  <div className="inner-book__read--text">Listen</div>
                </button>

              </div>
              {
                libStatus
                ?
              <div className="inner-book__bookmark" onClick={handleLibrary}>
                <div className="inner-book__bookmark--icon">
                  <FaBookmark />
                </div>
                <div className="inner-book__bookmark--text">
                  Saved In My Library 
                </div>
              </div>
              :
              <div className="inner-book__bookmark" onClick={handleLibrary}>
                <div className="inner-book__bookmark--icon">
                  <FaRegBookmark />
                </div>
                <div className="inner-book__bookmark--text">
                  Add title to My Library
                </div>
              </div>
              }
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
        </>
        }
      </div>
    </div>
  );
};

export default Book;
