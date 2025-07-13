import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState,setCurrentState] =useState('Login')
  const {token,setToken,backendUrl,navigate} =useContext(ShopContext)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const onSubmitHandler =async (event) => {
   event.preventDefault() 
   try {
   if (currentState === 'Sign Up') {
    const response = await axios.post(backendUrl+'/api/user/signup',{email,password,name})
    console.log(response.data);
    if (response.data.succes) {
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)  
    }    
    else{
      toast.error(response.data.messege);
    }
  }
  else{
    const response = await axios.post(backendUrl+'/api/user/login',{email,password})
if (response.data.succes) {
  console.log(response.data);
  
setToken(response.data.token)  
localStorage.setItem('token',response.data.token)  

} else{
  toast.error(response.data.messege)
}
 
 } 
   }
    catch (error) {
      console.log(error);
      toast.error(error.messege)
      
   }

   
  
  }
  useEffect(() => {
   if (token) {
    navigate('/')
   } 
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
<p className='prata-regular text-3xl'>{currentState}</p>
<hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login'?'': <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' type="text" required />
}
      <input className='w-full px-3 py-2 border border-gray-800 ' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' type="email" required />
      <input className='w-full px-3 py-2 border border-gray-800 ' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' type="password" required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer font-bold'>Forgot Your Password</p>
        {currentState === 'Login'?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer font-bold'>Create An Account</p>:<p onClick={()=>setCurrentState('Login')} className='font-bold cursor-pointer'>Login</p>}
      </div>
      <button className='cursor-pointer bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login
