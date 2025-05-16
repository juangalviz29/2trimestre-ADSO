import * as readline from "readline";

type Categoria = "Conferencia" | "Seminario" | "Taller";

interface Participante {
  id: number;
  nombre: string;
}

interface Evento {
  id: number;
  titulo: string;
  categoria: Categoria;
  fecha: string; // YYYY-MM-DD
  cupoMaximo: number;
  inscritos: number[];
}

const participantes: Participante[] = [
  { id: 1, nombre: "Carlos Ruiz" },
  { id: 2, nombre: "Laura Mora" },
  { id: 3, nombre: "Elena Quintero" }
];

const eventos: Evento[] = [
  { id: 1, titulo: "TechConf 2025", categoria: "Conferencia", fecha: "2025-06-01", cupoMaximo: 2, inscritos: [1, 2] },
  { id: 2, titulo: "Seminario de Liderazgo", categoria: "Seminario", fecha: "2025-06-02", cupoMaximo: 3, inscritos: [3] },
  { id: 3, titulo: "Taller de Diseño", categoria: "Taller", fecha: "2025-06-03", cupoMaximo: 1, inscritos: [] }
];

function filtrarEventos(fecha?: string, categoria?: Categoria) {
  return eventos.filter(e =>
    (!fecha || e.fecha === fecha) &&
    (!categoria || e.categoria === categoria)
  );
}

function listaParticipantesEvento(eventoId: number) {
  const evento = eventos.find(e => e.id === eventoId);
  return evento?.inscritos.map(id => participantes.find(p => p.id === id)?.nombre) || [];
}

function verificarCuposDisponibles(eventoId: number) {
  const evento = eventos.find(e => e.id === eventoId);
  return evento ? evento.inscritos.length < evento.cupoMaximo : false;
}

function generarCertificados(eventoId: number) {
  const evento = eventos.find(e => e.id === eventoId);
  if (!evento) return [];
  return evento.inscritos.map(id => {
    const participante = participantes.find(p => p.id === id);
    return `Certificado: ${participante?.nombre} asistió a ${evento.titulo}`;
  });
}

function calcularEstadisticas() {
  const stats: Record<string, number> = {};
  eventos.forEach(e => {
    stats[e.categoria] = (stats[e.categoria] || 0) + e.inscritos.length;
  });
  return stats;
}

// Interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Seleccione opción (1: Filtrar eventos, 2: Participantes, 3: Cupos disponibles, 4: Certificados, 5: Estadísticas): ", (opcion) => {
  switch (opcion) {
    case "1":
      rl.question("Fecha (YYYY-MM-DD, opcional): ", (fecha) => {
        rl.question("Categoría (Conferencia, Seminario, Taller, opcional): ", (cat) => {
          const catTyped = cat as Categoria;
          console.log(filtrarEventos(fecha || undefined, cat ? catTyped : undefined));
          rl.close();
        });
      });
      break;
    case "2":
      rl.question("ID del evento: ", (id) => {
        console.log(listaParticipantesEvento(parseInt(id)));
        rl.close();
      });
      break;
    case "3":
      rl.question("ID del evento: ", (id) => {
        console.log(verificarCuposDisponibles(parseInt(id)) ? "Cupos disponibles" : "Evento lleno");
        rl.close();
      });
      break;
    case "4":
      rl.question("ID del evento: ", (id) => {
        console.log(generarCertificados(parseInt(id)));
        rl.close();
      });
      break;
    case "5":
      console.log(calcularEstadisticas());
      rl.close();
      break;
    default:
      console.log("Opción no válida");
      rl.close();
  }
});
