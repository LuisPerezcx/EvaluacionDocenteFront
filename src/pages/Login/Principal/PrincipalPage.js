import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../Styles/PrincipalPage.css';
import NavBar from '../components/NavBar';
import { Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';

const PrincipalPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [open, setOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const navigate = useNavigate();  

  const [userId, setUserId] = useState(1);

  const professors = [
    { id: 1, name: 'Profesor 1' },
    { id: 2, name: 'Profesor 2' },
    { id: 3, name: 'Profesor 3' },
    { id: 4, name: 'Profesor 4' },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectProfessor = (professor) => {
    setSelectedProfessor(professor);
    handleClose();
    navigate('/formulario-calificaciones', { state: { professorName: professor.name } });
  };

  return (
    <div className="page-container">
      <NavBar /> 
      <div className="text-center pt-5 mt-5">
          <h1>Bienvenid@, {userData?.nombre}</h1> 
          <div>
            <h2>{userData.rol === 1 ? "Alumno" : userData.rol === 2 ? "Administrativo" : " "}</h2>
          </div>
      </div>
      <div className="main-content">
        <div className="card-container">
          {/* Cuadro 1 solo visible para usuario con ID 1 */}
          {userId === 1 && (
            <div className="card">
              <h3>Alumnos</h3>
              <button className="button">Ingresar</button>
            </div>
          )}

          {/* Cuadro 2 visible para todos los usuarios */}
          <div className="card">
            <h3>Formulario de evaluacion</h3>
            <button className="button" onClick={handleOpen}>Calificar maestro</button>
          </div>

          {/* Cuadro 3 solo visible para usuarios con ID diferente a 2 */}
          {userId !== 2 && (
            <div className="card">
              <h3>Maestros</h3>
              <button className="button">Ingresar</button>
            </div>
          )}
        </div>
      </div>

      {/* Modal sin oscurecer el fondo */}
      <Dialog open={open} onClose={handleClose} PaperComponent={Paper}>
        <DialogTitle>Selecciona un profesor</DialogTitle>
        <DialogContent dividers>
          <List>
            {professors.map((professor) => (
              <ListItem button key={professor.id} onClick={() => handleSelectProfessor(professor)}>
                <ListItemText primary={professor.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PrincipalPage;
