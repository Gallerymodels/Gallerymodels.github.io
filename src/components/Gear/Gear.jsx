import React, { useEffect, useState } from 'react'
import {getGear} from '../../utils/sanity'
import GearCard from './GearCard'

const Gear = () => {
 const [gear, setGear] = useState([])

 useEffect(() => {
  getGear().then((data) => setGear(data))
 }, [])
  return (
  
    <div className='w-full flex flex-col mt-16 gap-4 justify-center items-center'>
      {gear.map((item, index) => (
        <GearCard key={index} item={item} />
      ))}
    </div>
 
  )
}

export default Gear
