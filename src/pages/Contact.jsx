import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Letterbox from '../components/Letterbox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-5xl pt-10 border-t'>
<Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className=' w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
<div className='flex flex-col justify-center items-start gap-6'>
<p className='font-semibold text-xl text-gray-600'>Our Store </p>
<p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<p className='text-gray-500'>Tel: 12346499979 <br />Email:admin@forever.com</p>
<p className='text-gray-600 font-semibold text-xl'>Careers At Forever</p>
<p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
</div>
      </div>
<Letterbox/>
    </div>
  )
}

export default Contact
