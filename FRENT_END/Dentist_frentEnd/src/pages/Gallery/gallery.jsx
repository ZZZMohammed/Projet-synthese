
import React from 'react'
import '../Gallery/galler.css'

export default function Gallery() {

  const images = [
      {id:1 , src:'img/g1.png'},
       {id:2 , src:'img/g2.jpg'},
        {id:3 , src:'img/g3.jpg'},
         {id:4 , src:'img/g4.jpg'},
          {id:5 , src:'img/g5.jpg'},
           {id:6 , src:'img/g6.jpg'}
           
  ] ;


  return (
    <>
    
    <div className='banner d-flex justify-content-center align-items-center'>

          <h2 className='fw-bold text-white banner-text'>Gallery</h2>
          
    </div>

    <div className='container'>
        <div className="row justify-content-center">
            {images.map((image)=> (
                <div key={image.id} className='col-md-3 col-sm-6 mb-4 text-center'>
                    <img src={image.src}
                       className="img-fluid gallery-image"/>
                </div>
            )

            )}
        </div>
    </div>
    </>

  )
}
