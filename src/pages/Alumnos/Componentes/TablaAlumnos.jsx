import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../components/TablaIconos";
import { FormularioAlumno } from '../Componentes/FormularioAlumnos';
//import AlumnoService from "../../../services/AlumnoService";



const TablaAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEnEdicion, setAlumnoEnEdicion] = useState(null);
  const [estadoCargando, setEstadoCargando] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    actualizarListaAlumnos();
  }, [refreshTable]);

  const actualizarListaAlumnos = async () => {
    /*setEstadoCargando(true);
    try {
      const data = await AlumnoService.getAll();
      setAlumnos(data);
    } catch (error) {
      console.log("Error al cargar los alumnos: ", error);
    } finally {
      setEstadoCargando(false);
    }*/
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellidos", accessor: "apellidos" },
    { header: "Matrícula", accessor: "matricula" },
    { header: "Contraseña", accessor: "contraseña" },
  ];

  const eliminarAlumnoService = async (id) => {
    try {
      //await AlumnoService.deleteAlumno(id);
      setRefreshTable(!refreshTable); // Refrescar la tabla
    } catch (error) {
      console.log("Error al eliminar el alumno: ", error);
    }
  };

  const eliminarAlumno = (item) => {
  };

  const editarAlumno = (item) => {
    setAlumnoEnEdicion(item);
  };

  const guardarAlumno = async (nuevoAlumno) => {
    /*try {
      if (alumnoEnEdicion) {
        await AlumnoService.update(nuevoAlumno.id, nuevoAlumno);
      } else {
        await AlumnoService.create(nuevoAlumno);
      }
      setRefreshTable(!refreshTable);
      setAlumnoEnEdicion(null); // Salir del modo de edición
    } catch (error) {
      console.log("Error al guardar el alumno: ", error);
      AlertComponent.error({
        title: "Error",
        text: "Ocurrió un error al intentar guardar el alumno.",
      });
    }*/
  };

  const cancelarEdicion = () => {
    setAlumnoEnEdicion(null);
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