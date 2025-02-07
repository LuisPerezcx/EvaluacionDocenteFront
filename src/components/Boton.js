import React from 'react';

export const Button = ({ label, onClick, className = '', disabled = false }) => {
    return (
        <button
            // Evento que se ejecuta al hacer clic en el botón
            onClick={onClick}
            className={`btn ${className} ${disabled ? 'btn-disabled' : ''}`}

            // Si la prop 'disabled' es true, el botón estará deshabilitado.
            disabled={disabled}
        >
            {label}
        </button>
    );
};