import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MaestroService from '../../services/MaestroService';
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import './evaluacionesMaestro.css'

const EvaluacionesMaestro = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { id } = location.state || {}; // Extraemos el id del profesor desde el state

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return; // Si no hay id, no hacer nada

        const obtenerEvaluaciones = async () => {
            try {
                const evaluacionesData = await MaestroService.getEvaluacionesPorMaestro(id);
                setEvaluaciones(evaluacionesData);
                setError(false); // Si la solicitud fue exitosa
            } catch (error) {
                setEvaluaciones([]);
                setError(true); // Si hay un error en la solicitud
            }
        };

        obtenerEvaluaciones();
    }, [id]);

    return (
        <>
            <NavBar />
            <div className="evaluaciones-container">
                <button onClick={() => navigate(-1)} className='bg-success'>Regresar</button>
                <h2 className="evaluaciones-title">Evaluaciones del Profesor</h2>

                {error ? (
                    <p>No se pudieron cargar las evaluaciones del profesor.</p>
                ) : (
                    evaluaciones.length > 0 ? (
                        evaluaciones.map((evaluacion, index) => (
                            <div key={index} className="evaluacion-item">
                                <h3> {evaluacion.materia_nombre}</h3>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Aspecto</TableCell>
                                                <TableCell align="center">Calificación</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(evaluacion.aspectos).map(([aspecto, calificacion]) => (
                                                <TableRow key={aspecto}>
                                                    <TableCell>{aspecto.replace('_', ' ')}</TableCell>
                                                    <TableCell align="center">
                                                        <Rating value={calificacion} readOnly max={5} precision={0.5} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <div className="comentarios">
                                    <h4>Comentarios</h4>
                                    <p><strong>Positivos:</strong> {evaluacion.comentarios.positivos || 'No hay comentarios positivos.'}</p>
                                    <p><strong>Mejorar:</strong> {evaluacion.comentarios.mejorar || 'No hay sugerencias de mejora.'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay evaluaciones registradas para este profesor.</p>
                    )
                )}
            </div>
            <FooterComponent />
        </>
    );
};

export default EvaluacionesMaestro;
