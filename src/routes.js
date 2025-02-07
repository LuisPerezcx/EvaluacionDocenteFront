import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login  from './pages/Login/Login';
import PrincipalPage from './pages/Login/Principal/PrincipalPage';
import FormularioCalificaciones from './pages/Login/Formulario/FormularioCalificaciones';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/principal" element={<PrincipalPage />} />
      <Route path="/formulario-calificaciones" element={<FormularioCalificaciones />} />
    </Routes>
  );
};

export default AppRoutes;