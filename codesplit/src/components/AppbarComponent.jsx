import React from 'react'
import { Link } from 'react-router-dom'

const AppbarComponent = () => {
  return (
    <div className='homeAppbarContainer'>
        <div className='appbarInnerContainer'>
          <img
            className='appbar-logo'
            src='/codesplit.png'
            alt='codesplit-logo'
          />
          <ul className='appbar-list'>
            <li className='appbar-list-item'>
              <Link className='appbar-item-link' to='/about'>
                About Us
              </Link>
            </li>
            <li className='appbar-list-item'>
              <Link className='appbar-item-link' to='/login'>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default AppbarComponent