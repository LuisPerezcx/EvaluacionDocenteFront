import React from "react";
import TablaMaestros from "../Maestros/Componentes/TablaMaestros"; 

export const Maestros = () => {

  return (
    <>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1>AGREGAR MAESTROS</h1>
        </div>
        <div className="p-0 mb-4">
          <TablaMaestros />
        </div>
      </div>
    </>
  );
};