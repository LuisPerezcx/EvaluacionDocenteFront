import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import CalificarService from '../../services/CalificarService'; // Ajusta la ruta
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';

const ResultadosEvaluaciones = () => {
    const location = useLocation();
    
    // Lista de profesores ficticios con promedios
    const profesoresFicticios = [
        { id: 1, nombre: 'Profesor Juan Pérez', promedio: 4.5 },
        { id: 2, nombre: 'Profesor Ana Gómez', promedio: 4.8 },
        { id: 3, nombre: 'Profesor Carlos Ramírez', promedio: 4.2 },
        { id: 4, nombre: 'Profesor Laura Díaz', promedio: 5.0 },
    ];

    const [profesorSeleccionado, setProfesorSeleccionado] = useState(profesoresFicticios[0]); // Por defecto seleccionamos el primer profesor
    const [resultados, setResultados] = useState(null);

    // Simulamos la carga de resultados con un promedio por cada aspecto
    useEffect(() => {
        if (!profesorSeleccionado) return;

        const mockResults = {
            aspectos: {
                "Comunicación": profesorSeleccionado.promedio,
                "Puntualidad": profesorSeleccionado.promedio,
                "Organización": profesorSeleccionado.promedio,
                "Participación": profesorSeleccionado.promedio,
                "Conocimiento": profesorSeleccionado.promedio,
            }
        };

        setResultados(mockResults);

        // Si fuera a hacer una solicitud a la API, usarías esto:
        /* 
        const obtenerResultados = async () => {
            try {
                const response = await CalificarService.obtenerResultados(profesorSeleccionado.id);
                if (response?.status === 200 && response.data) {
                    setResultados(response.data);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los resultados.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        };
        obtenerResultados();
        */
    }, [profesorSeleccionado]);

    const handleChangeProfesor = (event) => {
        const profesor = profesoresFicticios.find(p => p.id === event.target.value);
        setProfesorSeleccionado(profesor);
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
                        value={profesorSeleccionado.id}
                        label="Selecciona un Profesor"
                        onChange={handleChangeProfesor}
                    >
                        {profesoresFicticios.map((profesor) => (
                            <MenuItem key={profesor.id} value={profesor.id}>
                                {profesor.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <h3 className="resultados-subtitle">Profesor: {profesorSeleccionado.nombre}</h3>
                {resultados ? (
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
                ) : (
                    <p>Cargando resultados...</p>
                )}
            </div>
            <FooterComponent />
        </>
    );
};

export default ResultadosEvaluaciones;
