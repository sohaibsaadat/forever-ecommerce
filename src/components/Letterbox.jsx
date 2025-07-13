import React from 'react'

const Letterbox = () => {
  const onSubmitHandler =(e)=>{
e.preventDefault();
  }
    return (
    <div className='text-center'>
       <p className='text-2xl font-medium text-gray-800'>
        Subscribe Now & Get 10% OFF
       </p>
       <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
       <form className='w-ful sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' action="">
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
        <button className='bg-black text-white cursor-pointer text-xs px-10 py-4' type='submit'>Subscribe</button>
       </form>
    </div>
  )
}

export default Letterbox
