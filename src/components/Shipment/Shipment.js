import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser,products:savedCart, shipment:data,orderTime: new Date()};
        
        fetch('http://localhost:5000/addOrder',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(orderDetails)

        })
        .then(res => res.json())
        .then(data =>{
          if(data){
            processOrder()
           alert('order successfully');
          }
        })

    }
    console.log(watch("example")); 
  
    return (
      
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        
        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}

        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required</span>}

        <input {...register("address", { required: true })} defaultValue={loggedInUser.address} placeholder="Your Address"/>
        {errors.address && <span className="error">Address is required</span>}

        <input {...register("phone", { required: true })} defaultValue={loggedInUser.phone}placeholder="Your Phone" />
        {errors.phone && <span className="error">Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;