import React, { useState, useEffect } from 'react';
import ApiResponse from '../utils/ApiResponse';
import Product from '../Components/Product/product';
import Button from '../Components/AtomComponent/Button';
import PHOTO1 from '../Assests/PHOTO1.jpg';
import '../Home/style.css';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(''); 
  const [sortOrder, setSortOrder] = useState(''); 
  const [ratingFilter, setRatingFilter] = useState(''); 
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchProducts(currentPage, sortBy, sortOrder, ratingFilter);
  }, [currentPage, sortBy, sortOrder, ratingFilter]);
  const fetchProducts = async (pageNumber, sortBy, sortOrder, ratingFilter) => {
    try {
      const response = await ApiResponse('GET', 'products', {
        page: pageNumber,
        sortBy: sortBy || undefined, 
        sortOrder: sortOrder || undefined, 
        ...(ratingFilter && { filters: { rating: ratingFilter } }), 
      });
      if (response.data.data.length > 0) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (products.length === 0) {
    return <div>No products found.</div>;
  }
  return (
    <div>
     
      <h1>Products</h1>
      <div className="sort-options">
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value="">None</option>
          <option value="product_id">Product ID</option>
          <option value="product_name">Product Name</option>
       
        </select>
        <label htmlFor="sortOrder"> Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="">None</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
     
        <label htmlFor="ratingFilter"> Filter By Rating:</label>
        <select id="ratingFilter" value={ratingFilter} onChange={handleRatingFilterChange}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
      </div>
    
      <div className="products">
        {products.map((product) => (
          <Product
            key={product.product_id}
            id={product.product_id}
            name={product.product_name}
            model={product.product_model}
            rating={product.rating}
            price={product.product_price}
            images={[PHOTO1]}
          />
        ))}
      </div>
     
      <div className="Pagination">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          <b>Page</b> <b>{currentPage}</b>
        </span>
        <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
      </div>
    </div>
  );
};
export default Home;






