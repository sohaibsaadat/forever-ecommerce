import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState, useEffect } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitems from '../components/Productitems';

function Collection() {
  const { products,search,setsearch } = useContext(ShopContext)
  const [showfilter, setshowfilter] = useState(false);
  const [allproducts, setallproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relevant')
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setcategory(prev => [...prev, e.target.value])
    }


  }


  useEffect(() => {
    console.log(category);


  }, [category])
  const togglesubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setsubcategory(prev => [...prev, e.target.value])
    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice()
  if (setsearch && search) {
    productsCopy= productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
  }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subcategory.length > 0) {
productsCopy = productsCopy.filter(item => 
  item.subcategory.some(sub => subcategory.includes(sub))
);    }
    setallproducts(productsCopy)
  }
  useEffect(() => {
    applyFilter();
  }, [subcategory, category,search,setsearch])
  useEffect(() => {
  sortProduct();
}, [sortType,products]);

  const sortProduct = () => {
    let fpCopy = allproducts.slice()
    switch (sortType) {
      case 'low-high':
        setallproducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setallproducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter()
        break;
    }
  }
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
      {/* {filter wala side} */}
      <div className='min-w-60'>
        <p onClick={() => {
          setshowfilter(!showfilter)
        }} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* {filter catagory} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGOREIS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* {filter subcategory} */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={togglesubcategory} />Topwear
            </p>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={togglesubcategory} />Bottomwear
            </p>
            <p className='flex gap-2' >
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={togglesubcategory} />Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* {products wala side} */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* {porudct sorting} */}
          <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant </option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* {allproduct rendering} */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6'>
          {
            allproducts.map((item, index) => (
              <Productitems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Collection
