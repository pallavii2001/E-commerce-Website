import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../utils/ApiResponse';
import '../Auth/Style.css';
import { Button } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await ApiResponse('post', 'users', null, {
        Name: name,
        email: email,
        password: password,
        Address: address
      });
      
      navigate('/login');
      console.log('Registration Successful:', response);
      setMessage('Successfully Registered!')

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>
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
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <Button className="auth-button" onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
