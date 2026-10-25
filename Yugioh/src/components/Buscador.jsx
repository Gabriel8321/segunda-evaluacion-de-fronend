import React from 'react';

function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="container my-4" style={{ maxWidth: '500px' }}>
      <div className="input-group">
        <span className="input-group-text bg-primary text-white" id="search-addon">
          🔍
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Busca un set por su nombre... (ej: Dragon)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar set"
          aria-describedby="search-addon"
        />
      </div>
    </div>
  );
}

export default Buscador;