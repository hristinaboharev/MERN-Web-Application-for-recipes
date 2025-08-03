import React from 'react';
import { Link } from 'react-router-dom'; // Uvozi Link komponentu koja služi za navigaciju između stranica
import './Header.css';


const Header = ({ token, username, onLogout }) => {
  return (
    <header className="main-header">
      <div className="logo">
        <span>Tinalish</span>
      </div>

      <nav className="main-nav">
        <ul>
          <li><Link to="/namirnice">Namirnice</Link></li>
          <li className="dropdown">
            <Link to="/" className="dropdown-link">
              Recepti ▾
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/recepti/kategorija/Doručak">Doručak</Link></li>
              <li><Link to="/recepti/kategorija/Ručak">Ručak</Link></li>
              <li><Link to="/recepti/kategorija/Večera">Večera</Link></li>
              <li><Link to="/recepti/kategorija/Zdrav obrok">Zdrav obrok</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="auth-links">
        {token && username ? (
          <>

            <Link to="/omiljeno" className='omiljeno-link'> Omiljeno</Link>
            <span>Dobrodošao/la, <strong>{username}</strong></span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
