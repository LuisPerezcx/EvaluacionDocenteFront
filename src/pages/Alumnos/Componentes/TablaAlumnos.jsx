import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../components/TablaIconos";
import { FormularioAlumno } from '../Componentes/FormularioAlumnos';
import AlumnoService from "../../../services/AlumnoService";
import Swal from 'sweetalert2';


const TablaAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEnEdicion, setAlumnoEnEdicion] = useState(null);
  const [estadoCargando, setEstadoCargando] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    actualizarListaAlumnos();
  }, [refreshTable]);

  const actualizarListaAlumnos = async () => {
    setEstadoCargando(true);
    try {
      const data = await AlumnoService.getAll();
      setAlumnos(data);
    } catch (error) {
      console.log("Error al cargar los alumnos: ", error);
      showErrorMessage("No se pudieron cargar los alumnos.");
    } finally {
      setEstadoCargando(false);
    }
  };

  const columns = [
    { header: "Nombre", accessor: "nombre_alumno" },
    { header: "Apellidos", accessor: "apellido_alumno" },
    { header: "Matrícula", accessor: "matricula" },
    { header: "Contraseña", accessor: "contrasenia" },
  ];

  const eliminarAlumnoService = async (id) => {
    try {
      await AlumnoService.deleteAlumno(id);
      setRefreshTable(!refreshTable); // Refrescar la tabla
      showSuccessMessage("Alumno eliminado correctamente.");
    } catch (error) {
      console.log("Error al eliminar el alumno: ", error);
      showErrorMessage("Hubo un error al eliminar el alumno.");
    }
  };

  const eliminarAlumno = (item) => {
    // Confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al alumno ${item.nombre_alumno}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarAlumnoService(item.id_alumno);  // Llamada a la función de eliminar
      }
    });
  };

  const editarAlumno = (item) => {
    setAlumnoEnEdicion(item);
  };

  const guardarAlumno = async (nuevoAlumno) => {
    console.log(nuevoAlumno);
    
    try {
      if (alumnoEnEdicion) {
        await AlumnoService.update(nuevoAlumno.id_alumno, nuevoAlumno);
        showSuccessMessage("Alumno actualizado correctamente.");
      } else {
        await AlumnoService.create(nuevoAlumno);
        showSuccessMessage("Alumno agregado correctamente.");
      }
      setRefreshTable(!refreshTable);
      setAlumnoEnEdicion(null); // Salir del modo de edición
    } catch (error) {
      console.log("Error al guardar el alumno: ", error);
      showErrorMessage("Hubo un error al guardar los datos del alumno.");
    }
  };

  const cancelarEdicion = () => {
    setAlumnoEnEdicion(null);
  };


  const showErrorMessage = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = '#FF0033';
        confirmButton.style.color = '#fff';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.fontSize = '16px';
      }
    });
  };
  
  const showSuccessMessage = (message) => {
    Swal.fire({
      title: 'Éxito',
      text: message,
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
  };

  return (
    <div>
      <CustomTable
        data={alumnos}
        columns={columns}
        onEdit={editarAlumno}
        onDelete={eliminarAlumno}
        searchPlaceholder="Buscar alumno..."
        edicion={alumnoEnEdicion}
        mostrarAnimacion={estadoCargando}
      />

      <div className="px-5">
        <FormularioAlumno
          onAdd={guardarAlumno}
          editingAlumno={alumnoEnEdicion}
          onCancel={cancelarEdicion}
        />
      </div>
    </div>
  );
};

export default TablaAlumnos;