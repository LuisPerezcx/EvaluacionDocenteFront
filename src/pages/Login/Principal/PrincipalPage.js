import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/PrincipalPage.css';
import NavBar from '../components/NavBar';
import { Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import AlumnoService from '../../../services/AlumnoService';

const PrincipalPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [open, setOpen] = useState(false);
  const [maestrosSelect, setMaestrosSelect] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const navigate = useNavigate();

  const professors = [
    { id: 1, name: 'Profesor 1' },
    { id: 2, name: 'Profesor 2' },
    { id: 3, name: 'Profesor 3' },
    { id: 4, name: 'Profesor 4' },
  ];

  useEffect(() => {
    const obtenerMaestros = async () => {
      setMaestrosSelect([{ }]);

      let id = userData.id;
      try{
        const response = await AlumnoService.getMaestrosbyAlumno(id);
        
        if (response && response.data) {
          const opciones = response.data.map((item) => {
            return {
              value: String(item.id_maestro)  +'-'+ String(item.id_materia),
              label: `${item.nombre_maestro} ${item.apellido_maestro} (${item.nombre_materia})`
            };
          });
          setMaestrosSelect((prev) => [...prev, ...opciones]);
        }
      } catch(error){
        console.log("Error al obtener maestros: ", error);
      }
    }

    if(userData.id){
      obtenerMaestros();
    }
    
  },[userData?.id]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectProfessor = (professor) => {
    setSelectedProfessor(professor);
    handleClose();

    const [id_maestro, id_materia] = professor.value.split('-');

    navigate('/formulario-calificaciones', { state: { id_maestro, id_materia, professorName: professor.label } });
  };

  // Si no hay datos de usuario, puedes mostrar una carga o mensaje de error
  if (!userData) {
    return <div>Loading...</div>; // O algún otro tipo de indicador de carga
  }

  return (
    <div className="page-container">
      <NavBar />
      <div className="text-center pt-5 mt-5">
        <h1>Bienvenid@, {userData.nombre}</h1>
        <div>
          <h2>{userData.rol === 1 ? "Alumno" : userData.rol === 2 ? "Administrativo" : " "}</h2>
        </div>
      </div>
      <div className="main-content">
  <div className="card-container">
    {/* Cuadro de formulario solo visible para el usuario con rol 1 (Alumno) */}
    {userData.rol === 1 && (
      <div className="card">
        <h3>Formulario de evaluación</h3>
        <button className="button" onClick={handleOpen}>Calificar maestro</button>
      </div>
    )}

    {/* Cuadro de Alumnos visible solo para el usuario con rol 2 (Administrativo) */}
    {userData.rol === 2 && (
      <div className="card">
        <h3>Alumnos</h3>
        <button className="button">Ingresar</button>
      </div>
    )}

    {/* Cuadro de Maestros visible solo para el usuario con rol 2 (Administrativo) */}
    {userData.rol === 2 && (
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
            {maestrosSelect.length === 1 ? (
              <ListItem>
                <ListItemText primary="Cargando maestros..." />
              </ListItem>
            ) : (
              maestrosSelect.map((professor) => (
                <ListItem button key={professor.value} onClick={() => handleSelectProfessor(professor)}>
                  <ListItemText primary={professor.label} />
                </ListItem>
              ))
            )}
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
