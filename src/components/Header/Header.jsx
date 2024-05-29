import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Header = () => {
  return (
    <h1 className='w-full h-10 md:h-20 p-4 sticky top-0 z-20 mx-auto flex flex-wrap items-center justify-between bg-gradient-to-b from-white from-60%'>
        <Link to="/" className="font-dejaRegular text-gray text-xl">
                Gallery Models
        </Link>
        <Nav />
    </h1>
  )
}

export default Header