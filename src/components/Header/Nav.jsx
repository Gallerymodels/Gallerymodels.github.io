import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
    return (
        <>
        <NavLink to='/portfolio'>Portfolio</NavLink>
        <NavLink to='/gear'>Gallery Gear</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
        </>
    )

}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {
        setIsOpen(!isOpen)
    }
  return (
    <>
    <nav className='flex w-1/3 justify-end'>
        <div className='hidden w-full md:flex justify-between font-dejaLight text-lg'>
            <NavLinks />           
        </div>
        <div className='md:hidden'>
            <button onClick={toggleNav}>
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>    
    </nav>
    {isOpen && (
        <div className='flex flex-col items-center basis-full bg-white font-dejaLight text-lg p-3'>
            <NavLinks />
        </div>
    )}
    </>
  )
}

export default Nav