import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Home from "../Home";
import OrderHistory from "../OrderHistory";

function Routerindex() {
  const [authenticated, setAuthenticated] = useState(false);


  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
  
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
    <Route
          path="/"
          element={<Home authenticated={authenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<OrderHistory  />} />
        
      </Routes>
  
  );
}

export default Routerindex;
