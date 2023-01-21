import { useEffect, createContext, useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [idCart, setIdCart] = useState(localStorage.getItem("id-cart") || "")
  const [cart, setCart] = useState([])
  const [loadingCart, setLoadingCart] = useState(true)
  const { user } = useContext(AuthContext)

  const getProducts = async()=>{
    setLoadingCart(true)
    try {
      const products = await axios.get(`http://localhost:8080/api/cart/${idCart}/products`)
      setCart(products.data)
    } catch (error) {
      console.log("Error to get products in your cart")
    } finally {
      setLoadingCart(false)
    }
  }

  const createCart = async()=>{
    try {
      const res = await axios.post("http://localhost:8080/api/cart")
      localStorage.setItem("id-cart", res.data.id)
      setIdCart(res.data.id)
      return res.data.id
    } catch (error) {
      console.log("Error to create new cart")
    }
  }
  
  const cartExist =()=>{
    if(idCart !== ""){
      return true
    }else{
      return false
    }
  }

  const addProduct = async(product)=>{
    try {
      if(!cartExist()){
        console.log("entro")
        const id = await createCart()
        const res = await axios.post(`http://localhost:8080/api/cart/${id}/products`, product)
        setCart(res.data)
        return
      }
      const res = await axios.post(`http://localhost:8080/api/cart/${idCart}/products`, product)
      setCart(res.data)
    } catch (error) {
      console.log("Error to add product in cart")
    }
  }

  const deleteProductIncart = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/cart/${idCart}/products/${id}`)
      getProducts()
    } catch (error) {
      console.log("Error to delete product in cart")
    }
  }

  const sendOrder = async()=>{
    try {
      const res = await axios.post(`http://localhost:8080/api/cart/send`, {user, cart, idCart})
      if(res.status === 200){
        setCart([])
      }
    } catch (error) {
      console.log("Error to send order")
    }
  }

  useEffect(() => {
    if(cartExist()){
      getProducts()
    }
  }, [idCart])
  

  return (
    <CartContext.Provider value={{ cart, idCart, loadingCart, setCart, setIdCart, addProduct, getProducts, deleteProductIncart, sendOrder }}>
      {children}
    </CartContext.Provider>
  );
};
