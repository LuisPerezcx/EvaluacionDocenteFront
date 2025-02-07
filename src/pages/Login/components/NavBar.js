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
    <nav className="nav bg-success mb-5">
      <Link to="/principal" className="link">Principal</Link>
      <button className="btn btn-danger ms-auto" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default NavBar;
