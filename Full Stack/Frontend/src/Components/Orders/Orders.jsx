import React from 'react';
import ApiResponse from '../../utils/ApiResponse';
import { useState } from 'react';
import { getDataFromStorage } from '../../utils/libs';

import "../../Home/style.css"

const Order = ({ orderId, productName, quantity, placedAt }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
   
  const handleOrderClick = async () => {
   
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: "Bearer "+token }; 
      const response = await ApiResponse('GET', `myorders/${orderId}`,null,null,headers);
      const productData = response.data;
      console.log(productData); 
      setOrderDetails(productData);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setOrderDetails(null);
  };
    return (
    <div className="order">
      <a href="#" onClick={handleOrderClick}><h3>Order ID: {orderId}</h3></a>
      <p>Product: {productName}</p>
      <p>Quantity: {quantity}</p>
      <p>Placed At: {new Date(placedAt).toLocaleString()}</p>
      {showPopup && orderDetails && (
        <div className="popup">
          <div className="popup-content">
            <h2>ID: {orderDetails.order.id}</h2>
            <p><b>Quantity:</b> {orderDetails.order.quantity}</p>
            <p><b>Order Placed At:</b> {orderDetails.order.orderPlacedAt}</p>
            <p><b>Name of Product:</b> {orderDetails.order.product_name}</p>
            <p><b>Status:</b> {orderDetails.order.status}</p> 
            <p><b>Shipping Address:</b> {orderDetails.order.Address}</p> 
            <p><b>Total Amount:</b> {orderDetails.order.total_amount}</p> 
            <p><b>Mode of Payment:</b> {orderDetails.order.mode_of_payment}</p> 
            
            
            <button onClick={closePopup}>Close</button>
          </div>
         
        </div>
      )}

      
    </div>
    
  );
};

export default Order;
