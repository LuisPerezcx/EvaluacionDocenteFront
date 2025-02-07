import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import PrincipalPage from './pages/Login/Principal/PrincipalPage';
import FormularioCalificaciones from './pages/Login/Formulario/FormularioCalificaciones';
import { Alumnos } from './pages/Alumnos/Alumnos';
import { Administradores } from './pages/Administradores/Administradores';
import ProtectedRoute from './components/ProtectedRoute';
import { Maestros } from './pages/Maestros/Maestros';
import ResultadosEvaluaciones from './pages/Resultados/ResultadosEvaluaciones';
import EvaluacionesMaestro from './pages/Resultados/EvaluacionesMaestro';


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
      <Route
        path='/Maestros'
        element={
          <ProtectedRoute allowedUserIds={[2]}>
            <Maestros />
          </ProtectedRoute>
        }
      />

      <Route
        path='/Resultados'
        element={
          <ProtectedRoute allowedUserIds={[2]}>
            <ResultadosEvaluaciones />
          </ProtectedRoute>
        }
      />

      <Route path="/evaluaciones/maestro" element={<EvaluacionesMaestro />} />
    </Routes>
  );
};

export default AppRoutes;
