import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Recepti from './pages/Recepti';
import ReceptDetalji from './pages/ReceptDetalji';
import ReceptiKategorija from './pages/ReceptiKategorija'; 
import Namirnice from './pages/Namirnice';
import Favorites from './pages/Favorites';
import Login from './Login';
import Signup from './Signup';
import Header from './components/Header';
import { jwtDecode } from 'jwt-decode';
import './App.css';

import { SavedProvider } from './components/SavedContext';  // obavezno importuj Provider

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
    <SavedProvider>
      <Router>
        <Header token={token} username={username} onLogout={handleLogout} />
        
        <div className="theme-toggle-container">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? (
              <img src="/images/moon.png" alt="Dark mode" className="theme-icon" />
            ) : (
              <img src="/images/sun.png" alt="Light mode" className="theme-icon" />
            )}
          </button>
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Recepti />} />
            <Route path="/namirnice" element={<Namirnice />} />
            <Route path="/recepti/kategorija/:kategorija" element={<ReceptiKategorija />} />
            <Route path="/recepti/:id" element={<ReceptDetalji />} />
            
            {/* FAVORITES */}
            <Route path="/omiljeno" element={token ? <Favorites /> : <Navigate to="/login" />} />

            <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={setToken} />} />
            <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
            {/* opcionalno: ruta za 404 */}
            <Route path="*" element={<h2>Stranica nije pronađena</h2>} />
          </Routes>
        </main>
      </Router>
    </SavedProvider>
  );
}

export default App;
