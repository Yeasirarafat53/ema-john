import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product.key);
    const{img,name,seller,price,stock,key} = props.product;

    

    return (
        <div className="product">
            
            
            <div>
                <img src={img} alt="" />
                
            </div>
            <div className="items">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link> </h4>
                <br />
                <p><small>by: {seller} </small></p>
                <p>${price}</p>
                <p>only {stock}left in stock-order soon</p>

                {/* akhne showAddToCart er value jekhane true pabe sekhane button ta dekhane r jekhane false pabe sekhane button dekhabe na */}
                {props.showAddToCart === true && <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} / > add to cart</button>}
                    
                    
                   
                   
                
            </div>
            
            
        </div>
    );
};

export default Product;