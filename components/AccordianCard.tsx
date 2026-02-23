'use client'
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordianCardProps {
    title: string;
    body: string;
}

const AccordianCard: React.FC<AccordianCardProps> = ({title, body}) => {
    const [accordian, setAccordian] = useState(false)
    const [height, setHeight] = useState('0px')
    const contentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (contentRef) {
            setHeight(accordian ? `${contentRef.current?.scrollHeight}px` : '0px')
        }
    }, [accordian])
  return (
    <div className="accordion__card">
      <div
        className="accordion__header"
        onClick={() => setAccordian(!accordian)}
      >
        <div className="accordion__title">
          {title}
        </div>
        <FaChevronDown
          className={`accordion__icon ${accordian ? "accordion__icon--rotate" : ''}`}
          height="1em"
          width='1em'
        />
      </div>
      <div className={`collapse ${accordian ? "show" : ''}`} style={{
          height,
          transition: "height 0.3s ease"
        }}>
        <div
        ref={contentRef}
          className='accordion__body'
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export default AccordianCard;
