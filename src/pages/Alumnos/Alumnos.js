import React from "react";
import TablaAlumnos from "./Componentes/TablaAlumnos";

import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';

export const Alumnos = () => {

  return (
    <>
      <NavBar />

      <div className="container my-5">
        <div className="text-center mb-4">
          <h1>AGREGAR ALUMNOS</h1>
        </div>
        <div className="p-0 mb-4">
          <TablaAlumnos />
        </div>
      </div>
      <FooterComponent />

    </>
  );
};
