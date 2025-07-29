import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Recepti from './pages/Recepti';
import ReceptDetalji from './pages/ReceptDetalji';
import ReceptiKategorija from './pages/ReceptiKategorija';
import Namirnice from './pages/Namirnice';
import Favorites from './pages/Favorites';
import Login from './Login';
import Signup from './Signup';

import Layout from './components/Layout'; // NOVA komponenta

import { jwtDecode } from 'jwt-decode';
import './App.css';

import { SavedProvider } from './components/SavedContext';

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
        <Routes>
          {/* Layout sa sidebarom za sve rute */}
          <Route
            path="/"
            element={
              <Layout
                token={token}
                username={username}
                onLogout={handleLogout}
                toggleTheme={toggleTheme}
                theme={theme}
              />
            }
          >
            <Route index element={<Recepti />} />
            <Route path="namirnice" element={<Namirnice />} />
            <Route path="recepti/kategorija/:kategorija" element={<ReceptiKategorija />} />
            <Route path="recepti/:id" element={<ReceptDetalji />} />
            <Route path="omiljeno" element={token ? <Favorites /> : <Navigate to="/login" />} />
          </Route>

          {/* Login/signup bez layout-a */}
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={setToken} />} />
          <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />

          <Route path="*" element={<h2>Stranica nije pronađena</h2>} />
        </Routes>
      </Router>
    </SavedProvider>
  );
}

export default App;
