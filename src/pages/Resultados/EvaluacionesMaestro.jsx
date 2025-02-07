import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MaestroService from '../../services/MaestroService';
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import './evaluacionesMaestro.css';

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

    // Agrupar las evaluaciones por materia
    const agruparPorMateria = (evaluaciones) => {
        return evaluaciones.reduce((acc, evaluacion) => {
            const materiaNombre = evaluacion.materia_nombre;
            if (!acc[materiaNombre]) {
                acc[materiaNombre] = [];
            }
            acc[materiaNombre].push(evaluacion);
            return acc;
        }, {});
    };

    // Calcular el promedio por materia
    const calcularPromedioPorMateria = (aspectos) => {
        if (!aspectos || Object.keys(aspectos).length === 0) return 0;

        let total = 0;
        let count = 0;

        // Recorremos los aspectos y calculamos la suma
        Object.values(aspectos).forEach(calificacion => {
            total += calificacion;
            count++;
        });

        return count > 0 ? total / count : 0;
    };

    const evaluacionesAgrupadas = agruparPorMateria(evaluaciones);

    return (
        <>
            <NavBar />
            <div className="evaluaciones-container">
                <button onClick={() => navigate(-1)} className='bg-success'>Regresar</button>
                <h2 className="evaluaciones-title">Evaluaciones del Profesor</h2>

                {error ? (
                    <p>No se pudieron cargar las evaluaciones del profesor.</p>
                ) : (
                    Object.keys(evaluacionesAgrupadas).length > 0 ? (
                        Object.keys(evaluacionesAgrupadas).map((materia, index) => {
                            const materiaEvaluaciones = evaluacionesAgrupadas[materia];
                            const promedioMateria = calcularPromedioPorMateria(materiaEvaluaciones[0].aspectos);

                            return (
                                <div key={index} className="evaluacion-item">
                                    <h3>{materia}</h3>
                                    <div className="promedio-materia">
                                        <strong>Promedio de la materia: </strong>
                                        <span>{promedioMateria.toFixed(2)}</span>
                                    </div>

                                    {materiaEvaluaciones.map((evaluacion, index) => (
                                        <div key={index}>
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
                                    ))}

                                    {/* Separador entre materias */}
                                    {index < Object.keys(evaluacionesAgrupadas).length - 1 && <hr className="materia-separator" />}
                                </div>
                            );
                        })
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
