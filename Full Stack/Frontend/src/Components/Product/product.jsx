import React, { useState } from 'react';
import '../../Home/style.css';
import ApiResponse from '../../utils/ApiResponse'; 

const Product = ({ id, name, model, rating, price, images }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleProductClick = async () => {
   
    try {
      const response = await ApiResponse('GET', `products/${id}`);
      const productData = response.data;
      
      setProductDetails(productData);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setProductDetails(null);
  };

  return (
    <div className="product-card">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Product`} />
      ))}
      <div className="product-info">
      <a href="#" onClick={handleProductClick}><h3>{name}</h3></a>
        {/* <p>Id: {id}</p> */}
        <p>Model: {model}</p>
        <p>Rating: {rating}</p>
        <p>Price: ${price}</p>
      </div>
      {showPopup && productDetails && (
        <div className="popup">
          <div className="popup-content">
            <h2>{productDetails.product.product_name}</h2>
            {images.map((image, index) => (
        <img key={index} src={image} alt={`Product ${index + 1}`} />
      ))}
            <p><b>ID:</b> {productDetails.product.product_id}</p>
            <p><b>Model:</b> {productDetails.product.product_model}</p>
            <p><b>Availability:</b> {productDetails.product.availability}</p>
            <p><b>Rating:</b> {productDetails.product.rating}</p>
            <p><b>Type:</b> {productDetails.product.type}</p>
            <p><b>Price:</b> ${productDetails.product.product_price}</p> 
            <button onClick={closePopup}>Close</button>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default Product;




