import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import CalificarService from '../../services/CalificarService'; // Ajusta la ruta
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';

const ResultadosEvaluaciones = () => {
    const location = useLocation();
    const professorName = location.state?.professorName || 'Profesor no seleccionado';
    const id_maestro = location.state?.id_maestro;
    const [resultados, setResultados] = useState(null);

    useEffect(() => {
        // Aquí estamos usando datos simulados en lugar de los datos reales
        const mockResults = {
            aspectos: {
                "Comunicación": 4.5,
                "Puntualidad": 4.8,
                "Organización": 4.2,
                "Participación": 4.7,
                "Conocimiento": 5,
            }
        };

        // Asigna los datos simulados a los resultados
        setResultados(mockResults);

        // Si fueras a hacer una solicitud a la API, usarías esto:
        /* 
        const obtenerResultados = async () => {
            try {
                const response = await CalificarService.obtenerResultados(id_maestro);
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

    }, [id_maestro]);

    return (
        <>
            <NavBar />
            <div className="resultados-container">
                <h2 className="resultados-title">Resultados de Evaluaciones</h2>
                <h3 className="resultados-subtitle">Profesor: {professorName}</h3>
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
