import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Importar Bootstrap Icons CSS

export function CustomTable({ data, columns, onEdit, onDelete, searchPlaceholder = 'Buscar...', edicion, onRowClick, showActions=true, mostrarAnimacion }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredData = data?.filter(item =>
        columns.some(column =>
            item[column.accessor]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (item) => {
        if (onRowClick) {
            onRowClick(item);
        }
    };

    return (
        <div className="container p-3">
            <div className="d-flex justify-content-center mb-3">
                <span className="input-group-text">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    type="text"
                    maxLength={16}
                    className="form-control buscar-input"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <div className="table-responsive mx-auto">
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.header}</th>
                            ))}
                            <th className="celda-icono"></th>
                            <th className="celda-icono"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { !mostrarAnimacion ? (
                        currentData.length > 0 ? (
                            currentData.map((item, index) => (
                                <tr key={index} onClick={() => handleRowClick(item)}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>
                                            {typeof column.accessor === 'function' 
                                            ? column.accessor(item) 
                                            : item[column.accessor]}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <>
                                            <td className="celda-icono text-center">
                                                {onEdit && (
                                                    <button
                                                        className="boton-icono"
                                                        onClick={() => onEdit(item)}
                                                        title="Editar"
                                                    >
                                                        <i className="bi bi-pen icono-editar"></i>
                                                    </button>
                                                )}
                                            </td>
                                            <td className="celda-icono text-center">
                                                {edicion === null && onDelete && (
                                                    <button
                                                        className="boton-icono"
                                                        onClick={() => onDelete(item)}
                                                        title="Eliminar"
                                                    >
                                                        <i className="bi bi-trash3 icono-basura"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 2} className="text-center text-muted">
                                    Sin datos registrados
                                </td>
                            </tr>
                        )) : (
                            <tr>
                            <td colSpan={columns.length + 2} className="text-center">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p>Cargando datos, por favor espere...</p>
                            </td>
                        </tr>
                        )}
                        
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    {[...Array(totalPages).keys()].map(page => (
                        <Pagination.Item
                            key={page + 1}
                            active={page + 1 === currentPage}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
}
