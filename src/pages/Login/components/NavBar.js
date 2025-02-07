import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Elimina los datos del usuario
    navigate('/'); // Redirige al inicio de sesión o página principal
  };

  return (
    <nav className="nav bg-success">
      <div className="nav-left">
        <div className="nav-links">
          <Link to="/principal" className="link">Principal</Link>
          {/* Otros enlaces aquí */}
        </div>
      </div>
      <div className="nav-right">
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
