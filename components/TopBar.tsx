import React from 'react'
import '../styles.css'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoIosMenu } from 'react-icons/io'

const TopBar = () => {
  return (
    <div className="search__background">
        <div className="search__wrapper">
            <figure></figure>
            <div className="search__content">
                <div className="search">
                    <div className="search__input--wrapper">
                        <input type="text" className="search__input" placeholder="Search for books" />
                        <div className="search__icon">
                            <FaMagnifyingGlass />
                        </div>
                    </div>
                </div>
                <div className="sidebar__toggle--btn">
                    <IoIosMenu />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopBar