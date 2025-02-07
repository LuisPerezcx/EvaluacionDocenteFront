import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import PrincipalPage from './pages/Login/Principal/PrincipalPage';
import FormularioCalificaciones from './pages/Login/Formulario/FormularioCalificaciones';
import { Alumnos } from './pages/Alumnos/Alumnos';
import { Administradores } from './pages/Administradores/Administradores';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/principal" 
        element={
          <ProtectedRoute allowedUserIds={[1, 2, 3]}>  {/* Solo los usuarios con id 1 o 2 */}
            <PrincipalPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/formulario-calificaciones" 
        element={
          <ProtectedRoute allowedUserIds={[1]}>  {/* Solo el usuario con id 1 */}
            <FormularioCalificaciones />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/Alumnos" 
        element={
          <ProtectedRoute allowedUserIds={[2]}>  {/* Solo el usuario con id 2 */}
            <Alumnos />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/Administradores" 
        element={
          <ProtectedRoute allowedUserIds={[2]}>  {/* Solo el usuario con id 2 */}
            <Administradores />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
