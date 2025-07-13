import { createContext } from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
    const currency = "PKR"
    const delivery_fee = "200"
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setsearch] = useState();
    const [showsearch, setshowsearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
    }, [])
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (!token && storedToken) {
    setToken(storedToken);
    getUserCart(storedToken);
  }
}, []);

    const addToCart = async (itemID, size) => {
        if (!size) {
            toast.error('Size to Select kar')
            return
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemID]) {
            if (cartData[itemID][size]) {
                cartData[itemID][size] += 1
            }
            else {
                cartData[itemID][size] = 1
            }
        }
        else {
            cartData[itemID] = {}
            cartData[itemID][size] = 1
        }

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {
                    itemId: itemID,
                    size: size
                }, {
                    headers: { token }
                });
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }



    const getCartCount = () => {
        let totalCount = 0;
        for (const itemID in cartItems) {
            for (const size in cartItems[itemID]) {
                try {
                    if (cartItems[itemID][size] > 0) {
                        totalCount += cartItems[itemID][size];

                    }
                } catch (error) {
                    console.error("Error in getCartCount:", error);
                }
            }
        }
        return totalCount;
    }
const updateQuantity = async (itemID, size, quantity) => {
  let CartCopy = structuredClone(cartItems);
  CartCopy[itemID][size] = quantity;
  setCartItems(CartCopy);

  if (token) {
    try {
      await axios.post(
        backendUrl + '/api/cart/update',
        { itemId: itemID, size, quantity }, // ✅ spelling: itemId (small d)
        { headers: { token } } // ✅ token must be in headers
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error("Login required to update cart");
  }
};
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {},{ headers: { token } })
            console.log(response.data.cartData);
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);

            toast.error(error.message)

        }
    }
    const getProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)

            if (response.data.success) {
                setProducts(response.data.products)

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }
    const value = {
        token, setToken,setCartItems, backendUrl, navigate, search, updateQuantity, getCartAmount, products, currency, delivery_fee, search, setsearch, showsearch, setshowsearch, cartItems, getCartCount, addToCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;