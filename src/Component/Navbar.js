import React from 'react';
const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-content">
          <img src="Cac_logo.png" alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-links">
          <a href="#member" className="nav-link">Guidlines</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
