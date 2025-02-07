import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="link">Inicio</Link>
      <Link to="/principal" className="link">Principal</Link>
    </nav>
  );
};

export default NavBar;
