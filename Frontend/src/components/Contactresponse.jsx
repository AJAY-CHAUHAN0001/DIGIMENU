import React from 'react'
import { Link } from 'react-router-dom'

export const Contactresponse = () => {
  return (
    <>
    <div className='flex items-center w-screen h-screen justify-center'>
        <h1 className='font-medium text-2xl'>Your message has been sent. Thank you! <span>&#x1F642;</span></h1>
        <div className='flex position-absolute mt-20  font-large text-xl'>
        <Link to="/">
           <p className='bi bi-arrow-left'>Back to Home</p>
        </Link>
        </div>
    </div>
 
    </>
  )
}
