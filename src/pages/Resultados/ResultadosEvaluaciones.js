import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import CalificarService from '../../services/CalificarService'; // Ajusta la ruta
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';
import MaestroService from '../../services/MaestroService';

const ResultadosEvaluaciones = () => {    
    const [maestrosSelect, setMaestrosSelect] = useState([]);
    const [profesorSeleccionado, setProfesorSeleccionado] = useState(null); // Por defecto seleccionamos el primer profesor
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!profesorSeleccionado) return;

        const obtenerResultados = async () => {
            try {
                const response = await MaestroService.getPromedioById(profesorSeleccionado.value);
                if (response?.status === 200 && response.data) {
                    setResultados({
                        aspectos: response.data.promedio_por_aspecto
                    });
                    setError(false); // Resetear error si hay datos
                } else if (response?.status === 404) {
                    setResultados(null); // No hay resultados
                    setError(true); // Marcar como error
                    Swal.fire({
                        title: 'Sin evaluaciones',
                        text: 'Este profesor aún no tiene evaluaciones registradas.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } catch (error) {
                setError(true); // Marcar error si ocurre otro tipo de fallo
                setResultados(null); // Limpiar resultados en caso de error
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los promedios.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        };
    
        obtenerResultados();
    }, [profesorSeleccionado]);

    useEffect(() => {
        const obtenerMaestros = async () => {    
          try {
            const response = await MaestroService.getAll();
            if (response && response.data) {
              const opciones = response.data.map((item) => {
                return {
                  value: item.id_maestro,
                  label: `${item.nombre_maestro} ${item.apellido_maestro}`
                };
              });
              setMaestrosSelect(opciones);

              if(opciones.length > 0) {
                setProfesorSeleccionado(opciones[0]);
              }
            }
          } catch (error) {
            console.log("Error al obtener maestros: ", error);
          }
        };
    

        obtenerMaestros();
        
    }, []);

    const handleChangeProfesor = (event) => {
        const profesor = maestrosSelect.find(p => p.value === event.target.value);
        setProfesorSeleccionado(profesor);
    };

    const handleVerEvaluaciones = () => {
        navigate('/evaluaciones/maestro', { state: { id: profesorSeleccionado.value } });
    };


    return (
        <>
            <NavBar />
            <div className="resultados-container">
                <h2 className="resultados-title">Resultados de Evaluaciones</h2>
                
                {/* Combo de selección de profesor */}
                <FormControl fullWidth>
                    <InputLabel id="profesor-select-label">Selecciona un Profesor</InputLabel>
                    <Select
                        labelId="profesor-select-label"
                        value={profesorSeleccionado ? profesorSeleccionado.value : ""}
                        label="Selecciona un Profesor"
                        onChange={handleChangeProfesor}
                    >
                        {maestrosSelect.map((profesor) => (
                            <MenuItem key={profesor.value} value={profesor.value}>
                                {profesor.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <h3 className="resultados-subtitle">Profesor: {profesorSeleccionado ? profesorSeleccionado.label : "No seleccionado"}</h3>
                {error ? (
                    // Si hay error, solo muestra el mensaje de que no hay evaluaciones
                    <p>No hay evaluaciones para este profesor.</p>
                ) : (
                    resultados ? (
                        <div>
                            <TableContainer component={Paper} className="table-container">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="table-header">Aspecto</TableCell>
                                            <TableCell align="center" className="table-header">Promedio</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(resultados.aspectos).map(([aspecto, promedio]) => (
                                            <TableRow key={aspecto}>
                                                <TableCell className="table-cell">{aspecto.replace('_', ' ')}</TableCell>
                                                <TableCell align="center" className="rating-cell">
                                                    <Rating value={promedio} readOnly max={5} precision={0.5} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='text-center mb-4'>
                                <button className='bg-success' onClick={handleVerEvaluaciones} >Ver evaluaciones</button>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando resultados...</p>
                    )
                )}
            </div>
            <FooterComponent />
        </>
    );
};

export default ResultadosEvaluaciones;
