import React from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
function Navbar() {
    const [visible, setVisible] = useState(false);
        const{search,setCartItems, setsearch, showsearch, setshowsearch,getCartCount,navigate,token,addToCart,setToken} = useContext(ShopContext);
const logOut = () => {
  localStorage.removeItem("token");
  setToken('');
  setCartItems({});
  window.location.reload();
};

        return (
    <div className='flex items-center justify-between py-5 font-medium'>
       <Link to='/'>  <img  src={assets.logo} className='w-36' alt="" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
<NavLink to='/' className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        
        <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        </ul>
        
        <div className='flex items-center gap-6'>
<img onClick={()=>setshowsearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
<div className="group relative">
    <Link to={'/login'}>    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
</Link>
{/* dropdown menue */}
   {token? <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
<p className='cursor-pointer hover:text-black' >My Profile</p>
<p onClick={()=>navigate('/order')} className='cursor-pointer hover:text-black' >Orders</p>
<p onClick={logOut} className='cursor-pointer hover:text-black' >Log Out</p>
        </div>
    </div>:null}
</div>
<Link to='/cart' className='relative'>
<img className='w-5 min-w-5' src={assets.cart_icon} alt="" />
<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
</Link>
<img onClick={()=>setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="" />
        </div>
         {/*small screen view*/}
         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
<div className='flex flex-col text-gray-600 '>
<div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
<img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
<p>Back</p>
</div>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
</div>
         </div>
    </div>
  )
}

export default Navbar