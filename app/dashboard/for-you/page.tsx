'use client'
import { useGetRecommendedBooksQuery, useGetSelectedBookQuery } from '@/redux/reccomenedSlice'
import Link from 'next/link'
import React from 'react'

const ForYou: React.FC = () => {
const { data, isLoading, isError } = useGetRecommendedBooksQuery()
  return (
    <div className="row">
        <div className="container">
            <div className="for-you__wrapper">
                <div className="for-you__title">Selected just for you</div>
                <Link href='/book' className='selected__book'>
                <div className="selected__book--sub-title">How Constant Innovation Creates Radically Successful Businesses</div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                    <figure className="book__image--wrapper">

                    </figure>
                    <div className="selected__book--text">
                        <div className="selected__book--title">The Lean Startup</div>

                    </div>
                </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ForYou