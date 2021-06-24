import React from 'react';

const ReviewItems = (props) => {
    // console.log(props);
    const {name,quantity,price,key} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px '

    } 
    
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
            <br/>
            <button onClick={() =>props.removeItem(key)} className="main-button">Remove</button>

        </div>
    );
};

export default ReviewItems;