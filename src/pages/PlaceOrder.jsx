import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {navigate,backendUrl,cartItems,setCartItems,getCartAmount,delivery_fee,products} =useContext(ShopContext)
  const [selection,setSelection]= useState('cod')
  const [formData,setFormData] =useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    province:'',
    city:'',
    address:'',
    near:'',
    zipcode:'',
    phone:''
    
  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data =>({...data,[name]:value}))
  }
  const onSubmitHandler =async (event) => {
    const token = localStorage.getItem('token')
    event.preventDefault();
    try {
let orderItems = [];

for (const productId in cartItems) {
  const sizes = cartItems[productId];
  for (const size in sizes) {
    if (sizes[size] > 0) {
      const itemInfo = structuredClone(products.find(product => product._id === productId));
      console.log(itemInfo);
      
      if (itemInfo) {
        itemInfo.size = size;
        itemInfo.quantity = sizes[size];
        orderItems.push(itemInfo);
      }
    }
  }
}
let orderData = {
  address:formData,
  items:orderItems,
  amount: Number(getCartAmount()) + Number(delivery_fee)
}
switch (selection) {
  //Api calls for cod
  case 'cod':
const response = await axios.post(backendUrl +'/api/order/place',orderData,{headers:{token}})

if (response.data.success) {
  const response = await axios.post(backendUrl + '/api/cart/clear', {}, { headers: { token } })
  console.log(response.data);
    if (response.data.success) {
      setCartItems({})
      navigate('/order')}
    }else{
      toast.error(response.data.message)
    }
    break
    default:
      break
}    



    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
{/* left side */}
<div className='text-xl sm:text-2xl my-3'>
<Title text1={'Delivery'} text2={'Information'} />
</div>
<div className='flex gap-3'>
<input required  onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
<input required  onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" />
</div>
<input required  onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' type="email" />
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' type="text" />
<div className='flex gap-3'>
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='province' value={formData.province} placeholder='Province' type="text" />
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' onChange={onChangeHandler} name='city' value={formData.city} type="text" />
</div>
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='House#,Sector,Area,City' onChange={onChangeHandler} name='address' value={formData.address} type="text" />
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='near' value={formData.near} placeholder='Any famous location around you' type="text" />
<div className='flex gap-3'>
<input required  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Zip Code' type="number" />
<input  required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone' type="number" />
</div>
      </div>
      {/* right side */}
      <div className='mt-8'>
<div className='mt-8 min-w-80'>
  <CartTotal/>
</div>
<div className='mt-12 '>
<Title text1={'PAYMENT'} text2={'METHOD'}/>
{/* Payment Method Selection */}
<div className='flex gap-3 flex-col lg:flex-row'>

<div onClick={()=>setSelection('cod')}  className='flex items-center  p-2 px-3 cursor-pointer'>
<p className={`min-w-3.5 h-3.5 border rounded-full ${selection === 'cod' ? 'bg-green-400':'' }`}></p>
<p className='text-gray-500 text-lg font-bold mx-4'>CASH ON DELIVERY</p>
</div>

</div>

</div>
<button type='submit' className=' text-end cursor-pointer bg-black text-white text-sm my-8 px-8 py-3'>Place The Order </button>
      </div>
    </form>
  )
}

export default PlaceOrder
