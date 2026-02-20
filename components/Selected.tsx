import Link from "next/link";
import React from "react";
import { useGetSelectedBookQuery } from "@/redux/reccomenedSlice";

const Selected = () => {
    const { data, isLoading, isError } = useGetSelectedBookQuery()
  return (
    <Link href="/book" className="selected__book">
      <div className="selected__book--sub-title">
        How Constant Innovation Creates Radically Successful Businesses
      </div>
      <div className="selected__book--line"></div>
      <div className="selected__book--content">
        <figure className="book__image--wrapper"></figure>
        <div className="selected__book--text">
          <div className="selected__book--title">The Lean Startup</div>
        </div>
      </div>
    </Link>
  );
};

export default Selected;
