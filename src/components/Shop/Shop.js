import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
// import fakeData from "./../../fakeData/index";





const Shop = () => { 
  const first10 = fakeData.slice(0,10);


  
  const[products,setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

// aitapart tuku holo review page a product gulo dekhalew abr shop a ashle seta r dekhay na karon shop a cart er moddhe data gulo set kore deinai tai review.js er moddhe useEffect Part tuku same to same vabe akhanew add kore dile problem ta solve hoye jabe..akhane sudhu aktu name change kore deya hoice....
  useEffect(()=> {

    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(existingKey =>{
        const product = fakeData.find(pd => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
        // console.log(existingKey,savedCart[existingKey]);
    })
    setCart(previousCart);
    // console.log(previousCart); 

  },[])
  
  const handleAddProduct = (product)=>{

    //shop a cart er moddhe NaN Dekhay setar e solution ai part tuku........  
    
    
    //   product er key guloke toBeAddedKey te rekhe dichi
    const toBeAddedKey = product.key;
// j product ta nite chacci seta ace kina seta check korteci
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
// jodi product ta na nei taile setar quantity 1 e thakbe
    let count = 1;
    let newCart;
    // jodi product ta pawa jay taile jotobar add korbo seta quantity 1 kore barbe 
    if (sameProduct) {
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        // jei product nibo sei product bade baki product guloke ja ace seivabei nibo filter kore r bole dibo tar newCart ta ki hobe..
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others,sameProduct]; 
    }
    //  jodi product ta na pawa jay
    else{
        product.quantity = 1;
        newCart = [...cart,product];
    }

    



    //   console.log(product);
    
    setCart(newCart);



    // // Akhane database er kaaj kora hoice(utilities)
    // // akhane callback function use kore dekhano hoice j product key same kina 
    // const sameProduct =newCart.filter(pd => pd.key === product.key);
    // // same hole setar length dekhano hoice..length dekha jabe inspect korle application er moddhe session storage er moddhe
    // const count = sameProduct.length;


// akhnae database theke function take call kora hoice..first er ta key dekhaice ,porerta akta product koybar add kora hoice seta dekhabe..
    addToDatabaseCart(product.key,count);
  }
  

   return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd=> <Product 
                        key = {pd.key}
                        // akhanew showAddToCart name er parameter pass kora hoice jno button jehane ace seikhane conditionally bolte pari j button kothay dekhabe
                        showAddToCart={true}
                        product={pd} 
                        handleAddProduct={handleAddProduct}
                        ></Product>)
                }
                   
                 
            </div>

            <div className="cart-container">
                <Cart cart = {cart}>
                    {/* shop a jno cart section a ai button ta dekhay reviewte jno na dekhay tai cart.js er button take aikhane add kore deya hoice r cart.js a atar jaygay dynamically props.children lekha hoice bcz component er moddhe default vabe kono kichu declare korle react setake children hishebe pass kore... */}
                <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
                
                {/* <h5>Order summery :{cart.length}</h5> */}

            </div>
            
           
            
        </div>
    );
};

export default Shop;