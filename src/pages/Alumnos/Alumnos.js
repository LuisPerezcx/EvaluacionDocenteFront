import React from "react";
import TablaAlumnos from "./Componentes/TablaAlumnos";

export const Alumnos = () => {

  return (
    <>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1>AGREGAR ALUMNOS</h1>
        </div>
        <div className="p-0 mb-4">
          <TablaAlumnos/>
        </div>
      </div>
    </>
  );
};
