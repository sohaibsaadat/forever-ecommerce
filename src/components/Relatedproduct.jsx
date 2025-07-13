  import React from 'react'
  import { useContext } from 'react'
  import { ShopContext } from '../context/ShopContext'
  import {useState, useEffect} from 'react'
  import Title from './Title'
  import Product from '../pages/Product'
  import Productitems from './Productitems'
  const Relatedproduct = ({category,subcategory}) => {
    const {products} = useContext(ShopContext);
    const [related,setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0 && category && subcategory) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => {
        const matchCategory = item.category === category;
        const matchSubcategory = Array.isArray(item.subcategory)
          ? item.subcategory.includes(subcategory)
          : item.subcategory === subcategory;
        return matchCategory && matchSubcategory;
      });

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subcategory]);
    return (
      <div className='my-24'>
        <div className='text-center text-3xl py-2'>
  <Title text1={'Related'} text2={'Products'}/>
        </div>
        <div className='grid grid-cols2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
  {related.map((item,index)=>(
  <Productitems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
  ))}
        </div>
      </div>
    )
  }

  export default Relatedproduct
