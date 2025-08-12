import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ token, username,userId, onLogout, toggleTheme, theme }) => {
  return (
    <div className="layout">
      <Sidebar
        token={token}
        username={username}
        userId={userId}   
        onLogout={onLogout}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
