import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login  from './pages/Login/Login';
import { Alumnos } from './pages/Alumnos/Alumnos'
import { Administradores } from './pages/Administradores/Administradores'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/Alumnos' element={<Alumnos/>} />
      <Route path='/Administradores' element={<Administradores/>} />
    </Routes>
  );
};

export default AppRoutes;