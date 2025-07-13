    import React, {  useState,useEffect } from 'react'
    import { assets } from '../assets/assets';
    import { useContext } from 'react';
    import { ShopContext } from '../context/ShopContext';
    import { useLocation } from 'react-router-dom';
    const Searchbar = () => {
        const { search, setsearch, showsearch, setshowsearch } = useContext(ShopContext);
        const [visible,setVisible]= useState(false);
        const location = useLocation();
        useEffect(() => {
        if (location.pathname.includes('/collection') && showsearch) {
    setVisible(true);   
        }
        else {
            setVisible(false);
        }  
        },[location.pathname, showsearch]);
        
        return showsearch && visible ?(
            <div className=' border- bg-gray-50 text-center'>
                <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 gap-2'>
                    <input value={search} onChange={(e) => setsearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
                    <img className='w-4' src={assets.search_icon} alt="" />
                    <img onClick={(e) => setshowsearch(false)} className='inline w-3  cursor-pointer' src={assets.cross_icon} alt="" />
                </div>
            </div>
        ) : null
    }

    export default Searchbar
