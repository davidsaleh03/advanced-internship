"use client"
import React from 'react'
import { useEffect, useState } from "react";

type RotatingListProps = {
  items: string[];
  interval?: number;
};

export default function RotatingList({
  items,
  interval = 2000,
}: RotatingListProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
  <div>
    {items.map((text, index) => (
      <div
        key={index}
        className={`statistics__heading ${
          index === activeIndex ? "statistics__heading--active" : ""
        }`}
      >
        {text}
      </div>
    ))}
  </div>
);
}