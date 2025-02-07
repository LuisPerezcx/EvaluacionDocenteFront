import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-links">
          <Link to="/principal" className="link">Principal</Link>
        </div>
      </div>
      
      <div className="nav-right">
        <Link to="/">
          <button className="logout-btn">Cerrar sesión</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
