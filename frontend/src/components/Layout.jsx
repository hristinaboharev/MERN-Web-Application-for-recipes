import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ token, username, onLogout, toggleTheme, theme }) => {
  return (
    <div className="layout">
      <Sidebar
        token={token}
        username={username}
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
