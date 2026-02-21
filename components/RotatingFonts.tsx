'use client'
import React, { useState } from 'react'
import { RiFontSize } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store' 
import { setFontSize } from '../redux/fontSlice' 

const RotatingFonts = () => {
    const dispatch = useDispatch<AppDispatch>()
  const fontSize = useSelector((state: RootState) => state.font.value)

  const fontMap: Record<string, number> = {
    one: 14,
    two: 18,
    three: 22,
    four: 26,
  }
    const [active, setActive] = useState(() => {
    const entry = Object.entries(fontMap).find(([key, size]) => size === fontSize)
    return entry ? entry[0] : 'one' 
  })

   const handleClick = (key: string) => {
    setActive(key)
    dispatch(setFontSize(fontMap[key]))
  }
  return (
    <div className='sidebar__link--wrapper sidebar__font--size-wrapper'>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'one' && 'sidebar__font--size-icon--active'}`} onClick={() => handleClick('one')}><RiFontSize className='sidebar__font--size-icon-small' /></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'two' && 'sidebar__font--size-icon--active'}`} onClick={() => handleClick('two')}><RiFontSize className='sidebar__font--size-icon-medium'/></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'three' && 'sidebar__font--size-icon--active'}`} onClick={() => handleClick('three')}><RiFontSize className='sidebar__font--size-icon-large' /></div>
        <div className={`sidebar__link--text sidebar__font--size-icon ${active === 'four' && 'sidebar__font--size-icon--active'}`} onClick={() => handleClick('four')}><RiFontSize className='sidebar__font--size-icon-xlarge'/></div>
    </div>
  )
}

export default RotatingFonts