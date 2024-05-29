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
    <div className='w-full flex flex-col items-center justify-start p-4 mt-8 md:mt-12'>
    {models.map((model, index) => (
      <div className='w-full mt-12 md:mt-20 flex flex-col items-start' key={index}>
        <Lightbox photos={model.photos}/>
        <article className='mt-8 whitespace-pre-wrap font-dejaLight text-xs/4 md:text-sm/7 text-left text-gray-500'>{model.description}</article>
       
      </div>
    ))}
  </div>
  )
}

export default Portfolio
