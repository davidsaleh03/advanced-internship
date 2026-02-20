'use client'
import Selected from '@/components/Selected'
import Link from 'next/link'
import React from 'react'

const ForYou: React.FC = () => {
  return (
    <div className="wrapper">
    <div className="row">
        <div className="container">
            <div className="for-you__wrapper">
                <div className="for-you__title">Selected just for you</div>
                <Selected />
            </div>
        </div>
    </div>
    </div>
  )
}

export default ForYou