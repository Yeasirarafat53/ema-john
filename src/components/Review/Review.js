import React, { useEffect,useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItem/ReviewItems';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart,setCart] = useState([])

    const [orderPlaced,setOrderPlaced] = useState(false); // by default order placed korenai tai false deyahoice

// event handler for clean all products
    const handlePlaceOrder = () => {
        // aita deya hoice jno button click deyar sathe sathe product gulo clean hoye jay mane faka hoye jay
        setCart([]);
        // ai state er value ta true hoye jabe jokhon state er valueke set kore dilam
        setOrderPlaced(true);
        // database theke neya hoice jno product gulo clean hoye jay
        processOrder()
    }

    // event handler for remove item in review order
    const removeItem = (productKey)=>{
        console.log("removed clicked",productKey);
        // akhane product gulo jno remove hoy sei jonno bole deya hoice j cart er product key jno eventhandler er parameter er key jno na mile taile product gulo remove hobe..
        const newCart =cart.filter(pd=>pd.key !== productKey);
        setCart(newCart)
        // product remove holew browser refresh dile abr back kore r atar solution holo databaseManager theke removeFromDatabaseCart k call kore setar moddhe eventhandler er parameter k pass kore dile database thekew remove hoye jabe
        removeFromDatabaseCart(productKey)
      }

                    

 
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        // only key gulo pete chaile keys method k call kore korte hobe
        const productKeys = Object.keys(savedCart);
        // koyta item add kora hoice seta ber kora or quantity ber kora r ki
        const cartProducts = productKeys.map(key => {
            // aikhane fakedata import kore sekhan theke find kore key er data er sathe miliye sei data gulo show korano hocce
            const product = fakeData.find(pd=>pd.key ===key);
// product er key er moddhe jokhon map kora hocce tokhon j quantity gulo pacci seigula product.quantity te set kore deya hocce
            product.quantity = savedCart[key]
            return product; 
        })
        // cartproducts take setCart er moddhe set kore deya hoice
         setCart(cartProducts);
        
    },[]);

   let thankyou;
   if(orderPlaced){
      thankyou = <img src={happyImage} alt="" />
   }  

    return (
        // shop a gele j outlook ta dekha jay same outlook ta dekhanor jonno shop.js theke classname and Cart component k call kore className shoho deya hoice jno shop er moto outlook ta dekhay...
        <div className="shop-container">
            {/* <p>Cart item:{cart.length}</p> */}
            <div className="product-container">
                {/* j koyta product add korco seikoyta order review te dekhanor jonno map kora hoice */}
            {
                cart.map(pd => <ReviewItems
                    removeItem={removeItem}
                    key={pd.key}
                    product={pd}></ReviewItems>)
            }

            {
                thankyou 
            }

            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    {/* review te jno onno akta button dkehay tai ai button ke add kore deya hoice..and  order placed korle jno setar moddhe jotgulo product ace seta jno clean kore dey..*/}
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;