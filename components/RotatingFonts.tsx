'use client'
import React, { useState } from 'react'
import { RiFontSize } from 'react-icons/ri'

const RotatingFonts = () => {
    const [active, setActive] = useState('one')
  return (
    <div className='sidebar__link--wrapper sidebar__font--size-wrapper'>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'one' && 'sidebar__font--size-icon--active'}`} onClick={() => setActive('one')}><RiFontSize className='sidebar__font--size-icon-small' /></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'two' && 'sidebar__font--size-icon--active'}`} onClick={() => setActive('two')}><RiFontSize className='sidebar__font--size-icon-medium'/></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'three' && 'sidebar__font--size-icon--active'}`} onClick={() => setActive('three')}><RiFontSize className='sidebar__font--size-icon-large' /></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'four' && 'sidebar__font--size-icon--active'}`} onClick={() => setActive('four')}><RiFontSize className='sidebar__font--size-icon-xlarge'/></div>
    </div>
  )
}

export default RotatingFonts