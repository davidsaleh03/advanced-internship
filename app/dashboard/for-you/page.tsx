'use client'
import Reccomended from '@/components/Reccomended'
import Selected from '@/components/Selected'
import React from 'react'

const ForYou: React.FC = () => {
  return (
    <div className="wrapper">
    <div className="row">
        <div className="container">
            <div className="for-you__wrapper">
                <div className="for-you__title">Selected just for you</div>
                <Selected />
                <div>
                    <div className="for-you__title">Recommended For You</div>
                    <div className="for-you__sub--title">We think you’ll like these</div>
                    <div className="for-you__recommended--books">
                        <Reccomended />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ForYou