import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

// MUI ikonice za dark/light mode
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import Avatar from '@mui/material/Avatar';

const Sidebar = ({ token, onLogout, username, userId }) => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="sidebar">
      <div className="logo">Tinalish</div>

      <nav className="sidebar-nav">
        <ul>
          <li className="has-submenu">
            <Link 
              to="/"
              className="parent-link"
            >
              Recepti ▾
            </Link>
            <ul className="submenu">
              <li>
                <Link 
                  to="/recepti/kategorija/Doručak" 
                  className={location.pathname === "/recepti/kategorija/Doručak" ? 'active' : ''}
                >
                  Doručak
                </Link>
              </li>
              <li>
                <Link 
                  to="/recepti/kategorija/Ručak" 
                  className={location.pathname === "/recepti/kategorija/Ručak" ? 'active' : ''}
                >
                  Ručak
                </Link>
              </li>
              <li>
                <Link 
                  to="/recepti/kategorija/Večera" 
                  className={location.pathname === "/recepti/kategorija/Večera" ? 'active' : ''}
                >
                  Večera
                </Link>
              </li>
              <li>
                <Link 
                  to="/recepti/kategorija/Zdrav obrok" 
                  className={location.pathname === "/recepti/kategorija/Zdrav obrok" ? 'active' : ''}
                >
                  Zdrav obrok
                </Link>
              </li>
            </ul>
          </li>
          <li><Link to="/namirnice">Namirnice</Link></li>
          <li><Link to="/Omiljeno">Omiljeno</Link></li>
        </ul>
      </nav>

      <div className="auth-links">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'dark' ? <LightModeIcon  size={20} /> : <DarkModeIcon  size={20} />}
        </button>

        {token ? (
          <>
            <div className="user-info dropdown">
              <Avatar sx={{ width: 32, height: 32, cursor: 'pointer' }} />
              <span className="username">{username}</span>

              <div className="dropdown-content">
                <Link to="/recept">Dodaj recept</Link>
                <Link to={`/users/${userId}`}>Moji recepti</Link>

                
              </div>
            </div>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>

        ) : (
          <>
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/signup" className="auth-btn">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
