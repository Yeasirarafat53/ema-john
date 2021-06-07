import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    console.log(props.product);
    const{img,name,seller,price,stock} = props.product;

    

    return (
        <div className="product">
            
            
            <div>
                <img src={img} alt="" />
                
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><smal>by: {seller} </smal></p>
                <p>${price}</p>
                <p>only {stock}left in stock-order soon</p>
                <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} / > add to cart</button>
                    
                   
                   
                
            </div>
            
            
        </div>
    );
};

export default Product;