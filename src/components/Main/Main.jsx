import React from 'react'
import TakaIshii from './TakaIshiiGallery_6b.jpg'
const Main = () => {
  return (
    <>
    <div className='p-4 mt-12'>
        <div className='whitespace-pre-wrap font-dejaLight text-xs/4 md:text-sm/7 text-left text-gray '>
        Bespoke architectural scale models of gallery spaces that are made to order. Models range from basic foamcore or are laser cut using a variety of durable materials.<br />
        Upon request gallery walls can be made magnetic to ensure the easy application of wall-based artworks. Details such as acrylic windows, steps and other
        architectural features can also be added.<br />
        The models can be a reusable fixture within a gallery providing long term practical solutions for exhibition planning or sent to gallery artists to realise exhibitions.
        Scale artworks are also available to order.<br />
        <br />
        Previous clients include; Gagosian, Thaddaeus Ropac, Taka Ishii Gallery <br />
        Please see selected portfolio of commisions.<br />
        <br />
        For a quote or enquiries contact info@gallerymodels.org <br />
        </div>
    </div>
    <div className='mt-12'>
    <img src={TakaIshii} alt="Taka Ishii Gallery" className='w-full' />
    </div>
    </>
  )
}

export default Main