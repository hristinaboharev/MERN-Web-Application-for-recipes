import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [poruka, setPoruka] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });
      setPoruka(res.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setPoruka(err.response?.data?.message || 'Greška prilikom registracije');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Registracija</h2>

        {poruka && (
          <div className={`auth-message ${poruka.includes('uspešno') ? 'success' : 'error'}`}>
            {poruka}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <label>Korisničko ime</label>
          <input
            type="text"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Unesi korisničko ime"
          />

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
            Registruj se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
