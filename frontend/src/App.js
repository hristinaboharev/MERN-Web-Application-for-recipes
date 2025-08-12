import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './Login';
import Signup from './Signup';
import Recepti from './pages/Recipes';
import ReceptDetalji from './pages/RecipeDetails';
import ReceptiKategorija from './pages/RecipeCategory';
import Namirnice from './pages/IngredientSearch';
import Favorites from './pages/Favorites';
import UserProfile from './pages/UserProfile';

import { jwtDecode } from 'jwt-decode';
import './App.css';
import { SavedProvider } from './components/SavedContext';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        setUsername(decoded.username);
        setUserId(decoded.id || decoded.userId || decoded._id); // proveri šta je u tokenu
      } catch {
        setUsername(null);
        setUserId(null);
      }
    } else {
      setUsername(null);
      setUserId(null);
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
                userId={userId}
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

            {/* Link ka profilu korisnika */}
            <Route path="/users/:userId" element={<UserProfile />} />
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
