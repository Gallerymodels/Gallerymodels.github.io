import React, { useState, useEffect } from 'react'
import { getModels } from '../../utils/sanity'
import Lightbox from './Lightbox'

const Portfolio = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels().then(data => {
            setModels(data);
        }).catch(error => {
            console.error("Error fetching models:", error);
        });
    }, []);
  return (
    <div className='w-full flex flex-col items-center justify-center p-4 mt-12 md:mt-20'>
    {models.map((model, index) => (
      <div className='w-full mt-12 md:mt-20 flex flex-col items-center' key={index}>
        <Lightbox photos={model.photos}/>
        <p className='mt-8 whitespace-pre-wrap font-dejaLight text-xs/4 md:text-sm/7 text-left text-gray-500'>{model.description}</p>
       
      </div>
    ))}
  </div>
  )
}

export default Portfolio
