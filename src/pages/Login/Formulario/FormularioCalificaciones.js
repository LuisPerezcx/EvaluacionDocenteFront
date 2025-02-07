import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Swal from 'sweetalert2';
import '../Styles/FormularioCalificaciones.css';

// Custom Icons for Rating
const customIcons = {
    1: { icon: <SentimentVeryDissatisfiedIcon />, label: 'Muy Malo' },
    2: { icon: <SentimentDissatisfiedIcon />, label: 'Malo' },
    3: { icon: <SentimentSatisfiedIcon />, label: 'Regular' },
    4: { icon: <SentimentSatisfiedAltIcon />, label: 'Bueno' },
    5: { icon: <SentimentVerySatisfiedIcon />, label: 'Excelente' },
};

const IconContainer = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value]?.icon}</span>;
};

const FormularioCalificaciones = () => {
    const location = useLocation();
    const professorName = location.state?.professorName || 'Profesor no seleccionado';

    const [ratings, setRatings] = useState({
        dominioTema: 0,
        claridadExplicar: 0,
        paciencia: 0,
        puntualidad: 0,
        interaccion: 0,
        materialDidactico: 0,
        evaluacionJusta: 0,
        motivacion: 0,
    });

    const [comments, setComments] = useState({ mejoras: '', positivos: '' });

    const handleRatingChange = (field, newValue) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [field]: newValue,
        }));
    };

    const handleCommentChange = (field, value) => {
        setComments((prevComments) => ({
            ...prevComments,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        const hasAllRatings = Object.values(ratings).every((rating) => rating > 0);

        if (!hasAllRatings) {
            Swal.fire({
                title: 'Error, campos insuficientes',
                text: 'Debes calificar todos los aspectos.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    const confirmButton = Swal.getConfirmButton();
                    confirmButton.style.backgroundColor = '#FF0033 ';
                    confirmButton.style.color = '#fff';
                    confirmButton.style.borderRadius = '5px';
                    confirmButton.style.fontSize = '16px';
                }
            });
            return;
        }

        Swal.fire({
            title: 'Formulario enviado con éxito',
            text: 'Gracias por tus calificaciones y comentarios.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = '#28a745';
                confirmButton.style.color = '#fff';
                confirmButton.style.borderRadius = '5px';
                confirmButton.style.fontSize = '16px';
            }
        });
        // Aquí se maneja el envío de datos
    };

    // Componente reutilizable para cada fila de calificación
    const RatingRow = ({ field, label, question }) => (
        <TableRow>
            <TableCell className="table-cell">
                <div className="question-text">
                    <strong>{label}</strong>
                    <p>{question}</p>
                </div>
            </TableCell>
            <TableCell align="center" className="rating-cell">
                <Rating
                    name={field}
                    value={ratings[field]}
                    onChange={(event, newValue) => handleRatingChange(field, newValue)}
                    max={5}
                    getLabelText={(value) => customIcons[value]?.label || ''}
                    IconContainerComponent={IconContainer}
                />
            </TableCell>
        </TableRow>
    );

    return (
        <div className="form-container">
            <h2 className="form-title">Formulario de Calificaciones</h2>
            <h3 className="form-subtitle">Profesor: {professorName}</h3>
            <TableContainer component={Paper} className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">Aspecto</TableCell>
                            <TableCell align="center" className="table-header">Calificación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[
                            { field: 'dominioTema', label: 'Dominio del Tema', question: '¿El maestro demuestra conocimientos sólidos en la materia?' },
                            { field: 'claridadExplicar', label: 'Claridad al Explicar', question: '¿Explica los temas de manera comprensible y estructurada?' },
                            { field: 'paciencia', label: 'Paciencia y Disposición', question: '¿Responde dudas sin impacientarse y busca distintas formas de explicar?' },
                            { field: 'puntualidad', label: 'Puntualidad', question: '¿Llega a tiempo y respeta el horario de clases?' },
                            { field: 'interaccion', label: 'Interacción con los Alumnos', question: '¿Fomenta la participación y el diálogo en clase?' },
                            { field: 'materialDidactico', label: 'Uso de Material Didáctico', question: '¿Utiliza recursos como diapositivas, videos, ejercicios prácticos, etc.?' },
                            { field: 'evaluacionJusta', label: 'Evaluación Justa', question: '¿Las tareas y exámenes son acordes a lo enseñado en clase?' },
                            { field: 'motivacion', label: 'Motivación al Estudiante', question: '¿Incentiva el interés y el aprendizaje en la materia?' },
                        ].map((aspect) => (
                            <RatingRow key={aspect.field} {...aspect} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="comment-section">
                <h4 className="comment-title">¿Qué aspectos crees que el profesor podría mejorar? (Opcional)</h4>
                <textarea
                    rows="4"
                    className="textarea"
                    value={comments.mejoras}
                    onChange={(e) => handleCommentChange('mejoras', e.target.value)}
                />
            </div>

            <div className="comment-section">
                <h4 className="comment-title">¿Qué aspectos positivos destacarías de este profesor? (Opcional)</h4>
                <textarea
                    rows="4"
                    className="textarea"
                    value={comments.positivos}
                    onChange={(e) => handleCommentChange('positivos', e.target.value)}
                />
            </div>

            <button onClick={handleSubmit} className="submit-button">
                Enviar Evaluación
            </button>
        </div>
    );
};

export default FormularioCalificaciones;
