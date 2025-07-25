import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Recepti from './pages/Recepti';
import ReceptDetalji from './pages/ReceptDetalji';
import ReceptiKategorija from './pages/ReceptiKategorija'; 
import Namirnice from './pages/Namirnice';
import Login from './Login';
import Signup from './Signup';
import Header from './components/Header';
import {jwtDecode} from 'jwt-decode';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch {
        setUsername(null);
      }
    } else {
      setUsername(null);
    }
  }, [token]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername(null);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Header token={token} username={username} onLogout={handleLogout} />
      
      <div className="theme-toggle-container">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Recepti />} />
          <Route path="/namirnice" element={<Namirnice />} />
          <Route path="/recepti/kategorija/:kategorija" element={<ReceptiKategorija />} />
          <Route path="/recepti/:id" element={<ReceptDetalji />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={setToken} />} />
          <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
          {/* opcionalno: ruta za 404 */}
          <Route path="*" element={<h2>Stranica nije pronađena</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
