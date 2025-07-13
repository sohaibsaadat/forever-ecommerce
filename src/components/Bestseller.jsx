import React, { useEffect } from 'react'
import {ShopContext} from '../context/ShopContext';
import { useContext, useState } from 'react';
import Title from './Title';
import Productitems from './Productitems';

const Bestseller = () => {
  const {products}= useContext(ShopContext);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  useEffect(()=>{
    const bestproduct = products.filter((item)=> item.bestseller === true);
    setBestsellerProducts(bestproduct.slice(0,5));
  },[])
    return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
<Title text1={'BEST'} text2={'SELLERS'}/>
<p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dicta quas animi mollitia perspiciatis ex!
</p>
</div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
  {
    bestsellerProducts.map((item,index)=>(
      <Productitems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
    ))
}
  
</div>
    </div>
  )
}

export default Bestseller
