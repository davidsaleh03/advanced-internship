"use client";
import { useGetBookQuery } from "@/redux/reccomenedSlice";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

const player = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data } = useGetBookQuery({ id });

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const bookInfo = data;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0,
    );
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      audioRef.current.duration,
    );
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
      <div className="summary">
        <div className="audio__book--summary">
          <div className="audio__book--summary-title">{bookInfo?.title}</div>
          <div className="audio__book--summary-text">{bookInfo?.summary}</div>
        </div>
        <div className="audio__wrapper">
          <audio
            ref={audioRef}
            src={bookInfo?.audioLink}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetaData}
          />
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper book__image--wrapper-5">
                <img src={bookInfo?.imageLink} alt="" className="book__image" />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">{bookInfo?.title}</div>
              <div className="audio__track--author">{bookInfo?.author}</div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button className="audio__controls--btn" onClick={skipBackward}>
                <TbRewindBackward10 />
              </button>
              <button
                className="audio__controls--btn audio__controls--btn-play"
                onClick={togglePlay}
              >
                {isPlaying ? <IoIosPause /> : <IoIosPlay />}
              </button>
              <button className="audio__controls--btn" onClick={skipForward}>
                <TbRewindForward10 />
              </button>
            </div>
          </div>
          <div className="audio__progress--wrapper audio__progress--color">
            <div className="audio__time">{timer(currentTime)}</div>
            <input
              type="range"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="audio__progress--bar"
              style={
                {
                  "--progress": duration
                    ? `${(currentTime / duration) * 100}%`
                    : "0%",
                } as React.CSSProperties
              }
            />
            <div className="audio__time">{timer(duration)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default player;
