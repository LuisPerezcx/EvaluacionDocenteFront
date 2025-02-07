import React from "react";
import TablaMaestros from "../Maestros/Componentes/TablaMaestros";
import NavBar from '../Login/components/NavBar';
import FooterComponent from '../../components/FooterComponent';

export const Maestros = () => {

  return (
    <>
      <NavBar/>
      <div className="container my-5">

        <div className="text-center mb-4">
          <h1>AGREGAR MAESTROS</h1>
        </div>
        <div className="p-0 mb-4">
          <TablaMaestros />
        </div>
      </div>
      <FooterComponent/>

    </>
  );
};