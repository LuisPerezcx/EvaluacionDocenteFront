import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../components/TablaIconos";
import { FormularioAdministrativo } from "./FormulariosAdministrativos";
//import AdminService from "../../../services/AdminService";

const TablaAdministradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [adminEnEdicion, setAdminEnEdicion] = useState(null);
  const [estadoCargando, setEstadoCargando] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    actualizarListaAdministradores();
  }, [refreshTable]);

  const actualizarListaAdministradores = async () => {
    setEstadoCargando(true);
    try {
      //const data = await AdminService.getAll();
      //setAdministradores(data);
    } catch (error) {
      console.log("Error al cargar los administradores: ", error);
    } finally {
      setEstadoCargando(false);
    }
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Contraseña", accessor: "contrasena" },
  ];

  const eliminarAdminService = async (id) => {
    /*try {
      await AdminService.deleteAdmin(id);
      setRefreshTable(!refreshTable); // Refrescar la tabla
      AlertComponent.success({
        title: "Eliminado",
        text: "Administrador eliminado de manera exitosa",
      });
    } catch (error) {
      console.log("Error al eliminar el administrador: ", error);
    }*/
  };

  const eliminarAdmin = (item) => {
  };

  const editarAdmin = (item) => {
    setAdminEnEdicion(item);
  };

  const guardarAdmin = async (nuevoAdmin) => {
    /*try {
      if (adminEnEdicion) {
        await AdminService.update(nuevoAdmin.id, nuevoAdmin);
      } else {
        await AdminService.create(nuevoAdmin);
      }
      setRefreshTable(!refreshTable);
      setAdminEnEdicion(null); // Salir del modo de edición
    } catch (error) {
      console.log("Error al guardar el administrador: ", error);
      AlertComponent.error({
        title: "Error",
        text: "Ocurrió un error al intentar guardar el administrador.",
      });
    }*/
  };

  const cancelarEdicion = () => {
    setAdminEnEdicion(null);
  };

  return (
    <div>
      <CustomTable
        data={administradores}
        columns={columns}
        onEdit={editarAdmin}
        onDelete={eliminarAdmin}
        searchPlaceholder="Buscar administrador..."
        edicion={adminEnEdicion}
        mostrarAnimacion={estadoCargando}
      />


      <div className="px-5">
        <FormularioAdministrativo
          onAdd={guardarAdmin}
          editingAdmin={adminEnEdicion}
          onCancel={cancelarEdicion}
        />
      </div>
    </div>
  );
};

export default TablaAdministradores;
