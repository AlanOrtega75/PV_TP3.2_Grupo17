import React, { useEffect, useState } from 'react';
import { obtenerProyectos, agregarProyecto, eliminarProyecto, buscarProyecto } from '../services/proyectoService';

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [titulo, setTitulo] = useState('');
  const [idProyecto, setIdProyecto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estadoProyecto, setEstadoProyecto] = useState('Pendiente');
  const [error, setError] = useState('');

  useEffect(() => {
    setProyectos(obtenerProyectos());
  }, []);

  const handleBuscar = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (!texto.trim()) {
      setProyectos(obtenerProyectos());
      return;
    }

    setProyectos(buscarProyecto(texto));
  };

  const handleEliminar = (id) => {
    setProyectos(eliminarProyecto(id));
  };

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('El nombre del proyecto es obligatorio.');
      return;
    }

    setProyectos(
      agregarProyecto({
        id: idProyecto.trim(),
        titulo: titulo.trim(),
        categoria: categoria.trim(),
        estado: estadoProyecto,
      })
    );

    setIdProyecto('');
    setTitulo('');
    setCategoria('');
    setEstadoProyecto('Pendiente');
    setBusqueda('');
    setError('');
  };

  return (
    <div className="contenedor-proyectos">
      <section className="project-panel" id="nuevo-proyecto">
        <div className="project-panel-header">
          <h2>Módulo de Proyectos</h2>
          <p>Registra, filtra y administra tus proyectos desde una sola interfaz.</p>
        </div>

        <form onSubmit={handleAgregar} className="project-form">
          <div className="project-form-row">
            <label htmlFor="tituloProyecto">Nombre del proyecto</label>
            <input
              id="tituloProyecto"
              type="text"
              placeholder="Ej. Plataforma de Exámenes"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="project-form-grid">
            <div className="project-form-row">
              <label htmlFor="idProyecto">ID</label>
              <input
                id="idProyecto"
                type="text"
                placeholder="Ej. 001"
                value={idProyecto}
                onChange={(e) => setIdProyecto(e.target.value)}
              />
            </div>

            <div className="project-form-row">
              <label htmlFor="categoriaProyecto">Categoría</label>
              <input
                id="categoriaProyecto"
                type="text"
                placeholder="Ej. Web, Mobile, Desktop"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>

            <div className="project-form-row">
              <label htmlFor="estadoProyecto">Estado</label>
              <select
                id="estadoProyecto"
                value={estadoProyecto}
                onChange={(e) => setEstadoProyecto(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-button">
            Agregar proyecto
          </button>
        </form>
      </section>

      <section className="project-search-panel">
        <label htmlFor="buscarProyectos">Buscar proyectos</label>
        <input
          id="buscarProyectos"
          type="text"
          placeholder="Buscar por título, categoría o estado"
          value={busqueda}
          onChange={handleBuscar}
        />
      </section>

      <section className="project-database" id="lista-proyectos">
        <div className="project-database-header">
          <h3>Base de datos de proyectos</h3>
          <p>Revisa los proyectos guardados y elimina los que ya no necesites.</p>
        </div>

        {proyectos.length > 0 ? (
          <div className="project-list">
            {proyectos.map((proy) => (
              <article key={proy.id} className="project-card">
                <div className="project-card-header">
                  <div>
                    <h4>{proy.titulo}</h4>
                    <span className="project-badge">{proy.categoria}</span>
                  </div>
                </div>

                <div className="project-meta">
                  <p className="meta-row">ID: <strong>{proy.id}</strong></p>
                  <p className="meta-row">Categoría: <strong>{proy.categoria}</strong></p>
                  <p className="meta-row">
                    Estado:
                    <span className={`project-status status-${proy.estado.replace(/\s+/g, '-').toLowerCase()}`}>
                      {proy.estado}
                    </span>
                  </p>
                </div>

                <div className="project-card-footer">
                  <button
                    type="button"
                    className="secondary-button delete-button"
                    onClick={() => handleEliminar(proy.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No hay proyectos registrados en este momento.</p>
        )}
      </section>
    </div>
  );
};

export default ListaProyectos;
