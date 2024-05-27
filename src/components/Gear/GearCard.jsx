import React from 'react'

const GearCard = ({ item }) => {
  const {title, description, price} = item
  return (
    <div className='p-8 mt-8 max-w-md '>
    <div className='p-4 border border-gray border-width-1 shadow-sm rounded-sm '>
      <div className='py-4 font-dejaRegular text-m'>{title}</div>
      <div className='py-4 font-dejaLight text-xs/7'>{description}</div>
      <div className='py-4 font-dejaLight text-xs'>{price ? `€${price}` : ''}</div>
    </div>
    </div>
  )
}

export default GearCard