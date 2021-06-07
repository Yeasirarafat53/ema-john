import React from 'react';
import { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
// import fakeData from "./../../fakeData/index";





const Shop = () => { 
  const first10 = fakeData.slice(0,10);


  
  const[products,setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  
  const handleAddProduct = (product)=>{
    //   console.log(product);
    const newCart = [...cart,product];
    setCart(newCart);
  }
  

   return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd=> <Product 
                        product={pd} 
                        handleAddProduct={handleAddProduct}
                        ></Product>)
                }
                   
                 
            </div>

            <div className="cart-container">
                <Cart cart = {cart}></Cart>
                
                {/* <h5>Order summery :{cart.length}</h5> */}

            </div>
            
           
            
        </div>
    );
};

export default Shop;