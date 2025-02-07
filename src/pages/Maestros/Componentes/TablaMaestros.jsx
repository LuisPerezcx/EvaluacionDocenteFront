import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../components/TablaIconos";
import { FormularioMaestro } from '../Componentes/FormularioMaestros';

const TablaMaestros = () => {
  const [maestros, setMaestros] = useState([]);
  const [maestroEnEdicion, setMaestroEnEdicion] = useState(null);
  const [estadoCargando, setEstadoCargando] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    actualizarListaMaestros();
  }, [refreshTable]);

  const actualizarListaMaestros = async () => {
    
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellidos", accessor: "apellidos" },
  ];

  const eliminarMaestroService = async (id) => {
    try {
      setRefreshTable(!refreshTable); 
    } catch (error) {
      console.log("Error al eliminar el maestro: ", error);
    }
  };

  const eliminarMaestro = (item) => {
    eliminarMaestroService(item.id);
  };

  const editarMaestro = (item) => {
    setMaestroEnEdicion(item);
  };

  const guardarMaestro = async (nuevoMaestro) => {
    
  };

  const cancelarEdicion = () => {
    setMaestroEnEdicion(null);
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
