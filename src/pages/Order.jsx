import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios, { all } from 'axios'
import { data } from 'react-router-dom'
const Order = () => {
 const {token,currency,backendUrl} =useContext(ShopContext)
 const [orderData,SetOrderData] =useState([])
const loadOrderData =async () => {
  try {
    if (!token) {
      return null
    }
    const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
    console.log(response.data.orders)
if (response.data.success) {
let allOrderData=[]
response.data.orders.map((order) => {
  order.items.map((item) => {
    item['amount'] = order.amount
    item['status'] = order.status
    item['date'] = order.date
    item['payment'] = order.payment
    item['paymentMethod'] = order.paymentMethod
allOrderData.push(item)
  })
})
console.log(allOrderData);
SetOrderData(allOrderData.reverse())
}
    
  } catch (error) {
}
  
}
useEffect(() => {
      loadOrderData()
    },[token])
  return (
    
    <div className='border-t pt-16'>
      <div className='text-2xl'>
<Title text1={'MY'} text2={'ORDERS'}/> 
      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='2-16 sm:w-20' src={item.image[0]}  alt="" />
                <div>
                  <p className='sm:text-base font-medium '>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base'>
<p>{item.price}{currency}</p>
<p>Quantity: {item.quantity}</p>
<p>Size: {item.size} </p>
                  </div>
                  <p className='mt-8'>Date <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-8'>Payment <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
<div className='flex items-center gap-2'>
<p className='min-w-2 h-2 rounded-full bg-green-500'></p>
<p className='text-sm md:text-base'>Ready To Ship</p>
</div>
<button className='border px-4 py-2 text:sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
