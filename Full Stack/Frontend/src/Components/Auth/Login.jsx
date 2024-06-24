import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {  setDataToStorage } from '../../utils/libs';
import ApiResponse from '../../utils/ApiResponse';
import { Button } from '@mui/material';

import '../Auth/Style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await ApiResponse('post', 'auth/login', null, {
        email,
        password,
      });

      
      setDataToStorage("token", response.data.token);
      
      navigate('/'); 
      window.location.reload();
      console.log('Login Successful:', response);
      setMessage('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container"> 
    <h2>Login</h2>
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field" 
      />
    </div>
    <div>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field" 
      />
    </div>
    {error && <div className="error-message">{error}</div>} 
    <Button className="auth-button" onClick={handleLogin}>Login </Button>
  </div>
  );
};

export default Login;

