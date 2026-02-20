import Link from "next/link";
import React from "react";
import { useGetSelectedBookQuery } from "@/redux/reccomenedSlice";
import { IoIosPlay } from "react-icons/io";

const Selected = () => {
    const { data } = useGetSelectedBookQuery()

   
   const selectedBook = data?.[0]
  return (
    <Link href="/book" className="selected__book">
      <div className="selected__book--sub-title">
         {selectedBook?.subTitle}
      </div>
      <div className="selected__book--line"></div>
      <div className="selected__book--content">
        <figure className="book__image--wrapper image--wrapper--2">
            {selectedBook?.imageLink && (
                <img className="book__image"src={selectedBook.imageLink} alt='book-page'/>
            )
        }
        </figure>
        <div className="selected__book--text">
          <div className="selected__book--title">{selectedBook?.title}</div>
          <div className="selected__book--author">{selectedBook?.author}</div>
          <div className="selected__book--duration-wrapper">
            <div className="selected__book--icon">
                <IoIosPlay />
            </div>
            <div className="selected__book--duration">3 mins 23 secs</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Selected;
