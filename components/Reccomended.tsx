import { useGetRecommendedBooksQuery } from '@/redux/reccomenedSlice'
import Link from 'next/link'
import React from 'react'
import { CiStar, CiTimer } from 'react-icons/ci'

const Reccomended = () => {
    const {data} = useGetRecommendedBooksQuery()

    const Reccomended = data ?? []

  return (
    <>
    {
        Reccomended?.map((book) => {
            return <Link href='/book' key={book.id} className='for-you__recommended--books-link'>
                {
                    book.subscriptionRequired 
                    &&
                    <div className='book__pill book__pill--subscription-required'>Premium</div>
                }
        <figure className="book__image--wrapper">
            <img src={book.imageLink} className='book__image'/>
        </figure>
        <div className="recommended__book--title">{book.title}</div>
        <div className="recommended__book--author">{book.author}</div>
        <div className="recommended__book--sub-title">{book?.subTitle}</div>
        <div className="recommended__book--details-wrapper">
            <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                    <CiTimer />
                </div>
                <div className="recommended__book--details-text">03:24</div>
            </div>
            <div className="recommended__book--details">
                <div className="recommended__book--details-icon"><CiStar /></div>
                <div className="recommended__book--details-text">{book.averageRating}</div>
            </div>
        </div>
    </Link>
        })
    }
    </>
  )
}

export default Reccomended