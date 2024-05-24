import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Header = () => {
  return (
    <div className='w-full h-10 sticky top-0 z-20 mx-auto flex flex-wrap items-center justify-between'>
        <Link to="/" className="font-dejaRegular text-gray text-xl">
                Gallery Models
        </Link>
        <Nav />
    </div>
  )
}

export default Header