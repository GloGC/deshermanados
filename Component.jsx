import React, { useState } from 'react';

function App() {
  const [deshermanados, setDeshermanados] = useState([]);
  const [modelo, setModelo] = useState('');
  const [tallaDerecha, setTallaDerecha] = useState('');
  const [tallaIzquierda, setTallaIzquierda] = useState('');
  const [numSucursal, setNumSucursal] = useState('');
  const [busquedaModelo, setBusquedaModelo] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [indiceEliminar, setIndiceEliminar] = useState(null);
  const [modeloEliminar, setModeloEliminar] = useState('');
  const [tallaDerechaEliminar, setTallaDerechaEliminar] = useState('');
  const [tallaIzquierdaEliminar, setTallaIzquierdaEliminar] = useState('');
  const [numSucursalEliminar, setNumSucursalEliminar] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!modelo || !tallaDerecha || !tallaIzquierda || !numSucursal) {
      alert('Por favor, complete todos los campos antes de agregar un deshermanado.');
      return;
    }
    setMostrarConfirmacion(true);
  };

  const handleConfirmacion = () => {
    const nuevoDeshermanado = {
      modelo: modelo,
      tallaDerecha: tallaDerecha,
      tallaIzquierda: tallaIzquierda,
      numSucursal: numSucursal
    };
    setDeshermanados([...deshermanados, nuevoDeshermanado]);
    setModelo('');
    setTallaDerecha('');
    setTallaIzquierda('');
    setNumSucursal('');
    setMostrarConfirmacion(false);
  };

  const handleCancelacion = () => {
    setMostrarConfirmacion(false);
  };

  const handleEliminar = (index) => {
    setModeloEliminar(deshermanados[index].modelo);
    setTallaDerechaEliminar(deshermanados[index].tallaDerecha);
    setTallaIzquierdaEliminar(deshermanados[index].tallaIzquierda);
    setNumSucursalEliminar(deshermanados[index].numSucursal);
    setIndiceEliminar(index);
    setMostrarConfirmacion(true);
  };

  const handleConfirmarEliminar = () => {
    const nuevosDeshermanados = [...deshermanados];
    nuevosDeshermanados.splice(indiceEliminar, 1);
    setDeshermanados(nuevosDeshermanados);
    setModeloEliminar('');
    setTallaDerechaEliminar('');
    setTallaIzquierdaEliminar('');
    setNumSucursalEliminar('');
    setIndiceEliminar(null);
    setMostrarConfirmacion(false);
  };

  const handleBusquedaModelo = (event) => {
    setBusquedaModelo(event.target.value);
  };

  const resaltarBusquedaModelo = (texto, busqueda) => {
    const partes = texto.split(new RegExp(`(${busqueda})`, 'gi'));
    return partes.map((parte, index) =>
      parte.toLowerCase() === busqueda.toLowerCase() ? <mark key={index}>{parte}</mark> : parte
    );
  };

  return (
    <div className="App">
      <h1>Gestión de Deshermanados</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo de Zapato:
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </label>
        <label>
          Talla del Zapato Derecho:
          <input type="text" value={tallaDerecha} onChange={(e) => setTallaDerecha(e.target.value)} />
        </label>
        <label>
          Talla del Zapato Izquierdo:
          <input type="text" value={tallaIzquierda} onChange={(e) => setTallaIzquierda(e.target.value)} />
        </label>
        <label>
          Número de Sucursal:
          <input type="text" value={numSucursal} onChange={(e) => setNumSucursal(e.target.value)} />
        </label>
        <button type="submit">Agregar Deshermanado</button>
        <p style={{ fontSize: 'small' }}>
          Si no dispone de alguno de los dos zapatos, introduzca 00 en la casilla de la talla de pie del pie que no tenga el zapato
        </p>
      </form>
      {mostrarConfirmacion && (
        <div>
          <p>Por favor, confirme que desea {indiceEliminar !== null ? 'eliminar' : 'agregar'} el deshermanado:</p>
          {indiceEliminar !== null ? (
            <>
              <p>Modelo de Zapato: {modeloEliminar}</p>
              <p>Talla del Zapato Derecho: {tallaDerechaEliminar}</p>
              <p>Talla del Zapato Izquierdo: {tallaIzquierdaEliminar}</p>
              <p>Número de Sucursal: {numSucursalEliminar}</p>
              <button onClick={handleConfirmarEliminar}>Confirmar Eliminar</button>
            </>
          ) : (
            <>
              <p>Modelo de Zapato: {modelo}</p>
              <p>Talla del Zapato Derecho: {tallaDerecha}</p>
              <p>Talla del Zapato Izquierdo: {tallaIzquierda}</p>
              <p>Número de Sucursal: {numSucursal}</p>
              <button onClick={handleConfirmacion}>Confirmar</button>
              <button onClick={handleCancelacion}>Cancelar</button>
            </>
          )}
        </div>
      )}
      <br />
      <label>
        Buscar por Modelo:
        <input
          type="text"
          value={busquedaModelo}
          onChange={handleBusquedaModelo}
          placeholder="Buscar por Modelo..."
        />
      </label>
      <ul>
        {deshermanados.map((deshermanado, index) => (
          <li key={index}>
            Modelo: {resaltarBusquedaModelo(deshermanado.modelo, busquedaModelo)}, Talla Derecha: {deshermanado.tallaDerecha}, Talla Izquierda: {deshermanado.tallaIzquierda}, Sucursal: {deshermanado.numSucursal}
            <button onClick={() => handleEliminar(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
