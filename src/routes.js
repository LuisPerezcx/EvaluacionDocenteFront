import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login  from './pages/Login/Login';
import { Alumnos } from './pages/Alumnos/Alumnos'
import { Administradores } from './pages/Administradores/Administradores';
import { Maestros } from './pages/Maestros/Maestros';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/Alumnos' element={<Alumnos/>} />
      <Route path='/Administradores' element={<Administradores/>} />
      <Route path='/Maestros' element={<Maestros/>} />
    </Routes>
  );
};

export default AppRoutes;