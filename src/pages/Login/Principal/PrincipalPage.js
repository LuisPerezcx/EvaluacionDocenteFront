import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../Styles/PrincipalPage.css';
import NavBar from '../components/NavBar';
import { Button, List, ListItem, ListItemText, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';

const PrincipalPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const navigate = useNavigate();  

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

      <div className="main-content">
        <div className="card-container">
          <div className="card">
            <h3>Cuadro 1</h3>
            <button className="button">Botón 1</button>
          </div>
          <div className="card">
            <h3>Cuadro 2</h3>
            <button className="button" onClick={handleOpen}>Calificar maestro</button>
          </div>
          <div className="card">
            <h3>Cuadro 3</h3>
            <button className="button">Botón 3</button>
          </div>
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
