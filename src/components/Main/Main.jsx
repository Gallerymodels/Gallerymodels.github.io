import React from 'react'
import TakaIshii from './TakaIshiiGallery_6b.jpg'
const Main = () => {
  return (
    <>
    <div className='p-4 mt-12'>
        <article className='whitespace-pre-wrap font-dejaLight text-xs/4 md:text-sm/7 text-left text-gray '>
        Bespoke architectural scale models of gallery spaces, made to order. Models range from basic foamcore or are laser cut using a variety of durable materials.<br />
        Upon request gallery walls can be magnetic to ensure the easy application of wall-based artworks. Details such as acrylic windows, steps and other
        architectural features can also be added.<br />
        The models can be be used as a long term practical solutions for exhibition planning or sent to gallery artists to realise exhibitions.
        Scale artworks are also available to order.<br />
        
        Previous clients include; Gagosian, Thaddaeus Ropac, Taka Ishii Gallery <br />
        See selected portfolio of commisions.<br />
        <br />
        For a quote or enquiries contact info@gallerymodels.org <br />
        </article>
    </div>
    <div className='mt-12 flex flex-col items-center justify-center'>
    <img src={TakaIshii} alt="Taka Ishii Gallery" className='w-3/4' />
    </div>
    </>
  )
}

export default Main