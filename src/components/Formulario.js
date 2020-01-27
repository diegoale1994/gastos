import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";
const shortid = require("shortid");

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarGasto = e => {
    e.preventDefault();

    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() == "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    const gasto = {
      id: shortid.generate(),
      nombre,
      cantidad
    }
    guardarGasto(gasto);
    guardarNombre('');
    guardarCantidad('');
    guardarCrearGasto(true);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aqui</h2>
      {error ? (
        <Error mensaje="Formulario ingresado de forma incorrecta" />
      ) : null}
      <div className="campo">
        <label>Nombre del Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ejemplo transporte"
          value={nombre}
          onChange={e => guardarNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="200"
          value={cantidad}
          onChange={e => guardarCantidad(+e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;
