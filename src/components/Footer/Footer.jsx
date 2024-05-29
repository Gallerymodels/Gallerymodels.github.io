import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <footer className='w-full grid grid-cols-1 items-center justify-end p-2 mt-12 md:mt-20'>
      
            <p className='text-xs font-dejaLight'>© {year} Gallery Models</p>
       
    </footer>
  )
}

export default Footer