import React from "react";
import TablaAdministradores from "./Componentes/TablaAdministradores";

export const Administradores = () => {

  return (
    <>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1>AGREGAR ADMINISTRADORES</h1>
        </div>
        <div className="p-0 mb-4">
          <TablaAdministradores/>
        </div>
      </div>
    </>
  );
};