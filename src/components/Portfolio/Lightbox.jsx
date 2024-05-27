import React, { useEffect } from 'react'
import { urlFor } from '../../utils/sanity'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'

const Lightbox = ({photos}) => {
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
          gallery: '#gallery--zoom-transition',
          children: 'a',
          showHideAnimationType: 'zoom',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
    
        return () => {
          lightbox.destroy();
          lightbox = null;
        };
      }, []);

  return (
    <div className='w-full'>
        <ul className='pswp-gallery flex flex-row flex-nowrap justify-center items-end' id='gallery--zoom-transition' key={photos.title}>
        {photos.map((photo, idx) => (
            <li key={idx}>
                <div>
                    <a 
                    href={photo.image ? urlFor(photo.image).url() : '#'}
                    data-pswp-width={photo.isPortrait ? 1000 : 1500}
                    data-pswp-height={photo.isPortrait ? 1500 : 1000}
                    
                    target='_blank'
                    rel='noreferrer'
                    >
                         <img 
                    src={photo.image ? (photo.isPortrait ? urlFor(photo.image).size(200,300).url() : urlFor(photo.image).size(300,200).url()) : ''}
                    alt={photo.alt}
                    key={idx} 
                />
                    </a>
               
                </div>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Lightbox
