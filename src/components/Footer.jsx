import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
<div>
    <img className='mb-5 w-32' src={assets.logo} alt="" />
    <p className='2-full md:w-2/4 text-gray-600'>
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, deserunt debitis est consectetur recusandae excepturi veniam minima ipsam reiciendis omnis et earum cumque repellat repellendus corporis incidunt nesciunt illum alias.
    </p>
</div>
<div>
    <p className='text-xl font-medium mb-5'>COMPANY</p>
    <ul className='flex flex-col text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
    </ul>
</div>
<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col text-gray-600'>
<li>+1-212-456-789</li>
<li>sohaibsaadat@forevermail.com</li>
    </ul>
</div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 Forever</p>
      </div>
    </div>
  )
}

export default Footer
