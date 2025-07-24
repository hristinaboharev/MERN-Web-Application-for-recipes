import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin(res.data.token);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Greška na serveru';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Prijava</h2>

        {errorMessage && <div className="auth-message error">{errorMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Unesi email"
          />

          <label>Lozinka</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Unesi lozinku"
          />

          <button type="submit" className="auth-button">
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
