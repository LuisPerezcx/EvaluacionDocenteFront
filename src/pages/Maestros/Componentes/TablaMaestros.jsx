import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../components/TablaIconos";
import { FormularioMaestro } from '../Componentes/FormularioMaestros';
import MaestroService from "../../../services/MaestroService";
import Swal from 'sweetalert2';

const TablaMaestros = () => {
  const [maestros, setMaestros] = useState([]);
  const [maestroEnEdicion, setMaestroEnEdicion] = useState(null);
  const [estadoCargando, setEstadoCargando] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    actualizarListaMaestros();
  }, [refreshTable]);

  const actualizarListaMaestros = async () => {
    try {
      const data = await MaestroService.getAll()
      setMaestros(data);
      setEstadoCargando(false);
    } catch (error) {
      console.log("Error al cargar los maestros: ", error);
      setEstadoCargando(false);
    }
  };

  const columns = [
    { header: "Nombre", accessor: "nombre_maestro" },
    { header: "Apellidos", accessor: "apellido_maestro" },
  ];

  const eliminarMaestroService = async (id) => {
    try {
      await MaestroService.deleteMaestro(id);
      setRefreshTable(!refreshTable); // Actualiza la tabla después de eliminar
      showSuccessMessage("Maestro eliminado exitosamente");
    } catch (error) {
      console.log("Error al eliminar el maestro: ", error);
      showErrorMessage("Hubo un error al eliminar el maestro");
    }
  };

  const eliminarMaestro = (item) => {    
    // Confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al maestro ${item.nombre_maestro} ${item.apellido_maestro}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarMaestroService(item.id_maestro); // Proceder con la eliminación
      }
    });
  };

  const editarMaestro = (item) => {
    setMaestroEnEdicion(item);
  };

  const guardarMaestro = async (nuevoMaestro) => {
    try {
      if (maestroEnEdicion) {
        console.log(maestroEnEdicion);
        
        // Si hay un maestro en edición, hacer la actualización
        await MaestroService.update(maestroEnEdicion.id_maestro, nuevoMaestro);
        showSuccessMessage("Maestro actualizado exitosamente");
      } else {
        // Si no hay maestro en edición, hacer la creación
        await MaestroService.create(nuevoMaestro);
        showSuccessMessage("Maestro agregado exitosamente");
      }
      setRefreshTable(!refreshTable); // Refrescar la tabla después de agregar o actualizar
      setMaestroEnEdicion(null); // Limpiar el estado de edición
    } catch (error) {
      console.error("Error al guardar el maestro:", error);
      showErrorMessage("Hubo un problema al guardar el maestro");
    }
  };  

  const cancelarEdicion = () => {
    setMaestroEnEdicion(null);
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
        data={maestros}
        columns={columns}
        onEdit={editarMaestro}
        onDelete={eliminarMaestro}
        searchPlaceholder="Buscar maestro..."
        edicion={maestroEnEdicion}
        mostrarAnimacion={estadoCargando}
      />

      <div className="px-5">
        <FormularioMaestro
          onAdd={guardarMaestro}
          editingMaestro={maestroEnEdicion}
          onCancel={cancelarEdicion}
        />
      </div>
    </div>
  );
};

export default TablaMaestros;
