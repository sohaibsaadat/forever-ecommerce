import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Letterbox from '../components/Letterbox'

const About = () => {
  return (
    <div >
      <div className='text-5xl text-center pt-7 border-t'>
<Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-7 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum numquam reiciendis aliquam quae rem quaerat! Ex modi ducimus similique velit exercitationem accusamus eos sequi fuga deserunt! Explicabo id magni enim.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veritatis eveniet a et ipsam officiis quisquam aut debitis voluptatibus maiores magnam aliquam, inventore, totam saepe possimus autem alias perspiciatis voluptatum.</p>
       <b className='text-gray-800 text-lg'>Our Mission</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veritatis eveniet a et ipsam officiis quisquam aut debitis voluptatibus maiores magnam aliquam, inventore, totam saepe possimus autem alias perspiciatis voluptatum.</p>
        </div>
      </div>
        <div className='text-5xl py-4'> 
<Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex  md:flew-row text-sm mb-20'>
        <div className=' text-lg border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Quality Assurance</b>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ea obcaecati, officia vero fuga tenetur hic ut magnam itaque beatae odio aperiam, facilis voluptate voluptatibus odit rem atque iure dolorem?</p>
        </div>
        <div className='text-lg border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Convenience</b>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ea obcaecati, officia vero fuga tenetur hic ut magnam itaque beatae odio aperiam, facilis voluptate voluptatibus odit rem atque iure dolorem?</p>
        </div>
        <div className='text-lg border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Exceptional Customer Service</b>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ea obcaecati, officia vero fuga tenetur hic ut magnam itaque beatae odio aperiam, facilis voluptate voluptatibus odit rem atque iure dolorem?</p>
        </div>
        </div>
        <Letterbox/>
    </div>
  )
}

export default About
