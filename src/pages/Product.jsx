import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Relatedproduct from '../components/Relatedproduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')
const fetchProductsData = async () => {
  const product = products.find((p) => p._id === productId);
  if (product) {
    if (!productData || productData._id !== product._id) {
      setproductData(product);
      setimage(product.image[0]); // Set image only when product changes
    }
  }
};


  useEffect(() => {
    fetchProductsData();
  }, [productId, products]);
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease in duration-500 opacity-100'>
      {/* productData */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Productimg */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-ful'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              )
              )}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* product dtails */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-8 text-3xl font-medium'>{productData.price}{currency}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>

              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>   ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
<p>100% Original Product</p>
<p>Cash on Delivery is available</p>
<p>Easy return and exchange policy in 7 days</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className='mt-10'>
<div className='flex'>
<b className=' px-5 text-sm'>Description</b>
<p className=' px-5 text=sm'>Reviews(122)</p>
</div>
<div className='flex flex-col gap-4  px-6 py-6 text-sm text-gray-500'>
  <p>{productData.description}</p>
</div>
      </div>
      {/* display related products */}
<Relatedproduct 
  category={productData.category} 
  subcategory={Array.isArray(productData.subcategory) ? productData.subcategory[0] : productData.subcategory}
/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product