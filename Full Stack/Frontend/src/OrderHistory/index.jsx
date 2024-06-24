import React, { useState, useEffect } from 'react';
import Order from '../Components/Orders/Orders'; 
import { getDataFromStorage } from '../utils/libs';
import ApiResponse from '../utils/ApiResponse';

import '../OrderHistory/Style.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getDataFromStorage('token'); 
        const headers = { Authorization: "Bearer "+token }; 
        const response = await ApiResponse('GET', 'myorders', null, null, headers);
        setOrders(response.data.userOrders); 
        console.log(response.data.userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <Order
            key={order.order_id}
            orderId={order.order_id}
            productName={order.order_product_name}
            quantity={order.order_quantity}
            placedAt={order.order_orderPlacedAt}
          />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;


