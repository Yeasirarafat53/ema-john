import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    // akhane productKey take app.js theke dynamically pathaici tai akhane useParams() call kore key take catch kora hoice
    const {productKey} = useParams()
    // akhane fakeData datake import kore data gulo load kore find() use kore specific productKey er sathe match koriye datar info gulo show korabo ..
    const product = fakeData.find(pd => pd.key === productKey)
    console.log(product);
  
    return (
        <div>
            {/* <p>{productKey} details coming sooooon</p> */}
            <h3>Your Product Details:</h3>

            {/* akhane shop.js theke Product component a call kore setar moddhe parameter akare (product={pd} ) jei data pass korecilam setae akhnae product name er moddhe dynamically pathano hoice taile specific product take show korbe */}
            {/* akhan theke showAddToCart name a parameter pass kora hoice and shop.js ew same name er parameter pass kora hoice jno button jekhane ace seikhan theke conditionally bole dite pari j button kothay dekhabe */}
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;