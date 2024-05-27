import React from 'react'
import {Mail, Phone, MapPin} from 'lucide-react'

const Contact = () => {
  return (
    <div>
      <div className='flex items-center justify-start p-4 mt-12'>
        <Mail strokeWidth={0.5} className='w-6 h-6 text-gray-500 mr-4' />
        <p className='text-sm font-dejaLight'> info@gallerymodels.org</p>
      </div>
      <div className='flex items-center justify-start p-4'>
        <Phone strokeWidth={0.5} className='w-6 h-6 text-gray-500 mr-4' />
        <p className='text-sm font-dejaLight'> +44 (0) 7792736635</p>
      </div>
      <div className='flex items-center justify-start p-4'>
        <MapPin strokeWidth={0.5} className='w-6 h-6 text-gray-500 mr-4' />
        <p className='text-sm font-dejaLight'>
          Germany / UK
        </p>
      </div>
    </div>
  )
}

export default Contact
