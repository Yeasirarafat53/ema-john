import React from 'react';

import './Cart.css'
const Cart = (props) => {

    const cart = props.cart;

    // const total = cart.reduce((total,prd)=> total + prd.price*prd.quantity,0 );
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;

        
        
    }
    

    let shipping = 0;
    if (total>35) {
        shipping=0;
        
    }
    else if(total>15){
        shipping = 4.99
    }

    else if(total>0){
        shipping = 12.99;
    }

    const tax = total/10

    const grandTotal = (total + shipping + (tax)).toFixed(2)

 const formatNumber = (num)=>{
     const precision = num.toFixed(2);
     return Number(precision)
 }

    return (
        <div className="cart">
            <h2>Order summery</h2>
            <h5>Item Ordered: {cart.length}</h5>
            <p><small>Product Price: ${formatNumber(total)}</small></p>
            <p><small>Shipping:{shipping}</small> </p>
            <p><small>Taxes: ${formatNumber(tax)}</small></p>
            <h4>Grand Total: ${grandTotal}</h4>
                <br />
            {
                props.children
            }
            
            

        </div>
    );
};

export default Cart;