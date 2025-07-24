import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Recepti from './Recepti';
import ReceptDetalji from './ReceptDetalji';
import Namirnice from './Namirnice';
import Login from './Login';
import Signup from './Signup';
import {jwtDecode} from 'jwt-decode';
import './App.css';

// react ikonice
import { IoFastFoodSharp } from "react-icons/io5";
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(null);
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <Router>
      <div>
        {/* HEADER */}
        <header>
          <h1 style={{ fontFamily: "'Dancing Script', cursive", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IoFastFoodSharp size={32} /> Tinalish
        </h1>

          <nav>
            <button className="hamburger-btn" onClick={toggleSidebar}>
              ☰
            </button>
            {token && username ? (
              <div className="header-loggedin">
                <span>Dobrodošao/la, <strong>{username}</strong></span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="header-auth-links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </nav>
        </header>

        {/* Toggle tema */}
        <div className="theme-toggle-container">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? <BsMoonStarsFill size={20} /> : <BsSunFill size={20} />}
          </button>
        </div>

        {/* Layout */}
        <div className="layout-container">
          {/* Sidebar (Hamburger meni) */}
          <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <nav>
              <Link to="/" onClick={toggleSidebar}>Recepti</Link>
              <Link to="/namirnice" onClick={toggleSidebar}>Namirnice</Link>
            </nav>
          </aside>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Recepti />} />
              <Route path="/namirnice" element={<Namirnice />} />
              <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={setToken} />} />
              <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
              <Route path="/recepti/:id" element={<ReceptDetalji />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
