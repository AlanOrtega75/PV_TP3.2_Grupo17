const proyectoService = (() => {
  let proyectos = [
    {
      id: 1,
      titulo: "Aula Virtual Interactiva",
      categoria: "Web",
      estado: "En Progreso",
    },
    {
      id: 2,
      titulo: "App de Asistencia Escolar",
      categoria: "Mobile",
      estado: "Completado",
    },
    {
      id: 3,
      titulo: "Control de Equipamiento",
      categoria: "Desktop",
      estado: "Pendiente",
    },
    {
      id: 4,
      titulo: "Biblioteca Digital",
      categoria: "Web",
      estado: "En Progreso",
    },
    {
      id: 5,
      titulo: "Plataforma de Exámenes",
      categoria: "Web",
      estado: "Completado",
    },
  ];

  const obtenerProyectos = () => {
    return [...proyectos];
  };

  const agregarProyecto = (nuevoProyecto) => {
    const id = nuevoProyecto.id ? nuevoProyecto.id : Date.now();

    const proyectoConId = {
      ...nuevoProyecto,
      id: id,
    };

    proyectos.push(proyectoConId);

    return [...proyectos];
  };

  const eliminarProyecto = (id) => {
    proyectos = proyectos.filter((proy) => proy.id !== id);

    return [...proyectos];
  };

  const buscarProyecto = (texto) => {
    const criterio = texto.trim().toLowerCase();

    if (!criterio) {
      return [...proyectos];
    }

    return proyectos.filter((proy) =>
      proy.titulo.toLowerCase().includes(criterio)
    );
  };

  return {
    obtenerProyectos,
    agregarProyecto,
    eliminarProyecto,
    buscarProyecto,
  };
})();

export const {
  obtenerProyectos,
  agregarProyecto,
  eliminarProyecto,
  buscarProyecto,
} = proyectoService;

export default proyectoService;