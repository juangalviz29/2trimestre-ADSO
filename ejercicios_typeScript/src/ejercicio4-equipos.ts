import * as readline from "readline";

interface Equipo {
  id: number;
  nombre: string;
  valor: number;
  asignadoAula?: string; // undefined si no está asignado
  tipo: "Computador" | "Proyector" | "Impresora";
}

interface Aula {
  nombre: string;
}

const aulas: Aula[] = [
  { nombre: "Aula 101" },
  { nombre: "Aula 102" },
  { nombre: "Aula 103" }
];

const equipos: Equipo[] = [
  { id: 1, nombre: "PC-01", valor: 2000000, tipo: "Computador", asignadoAula: "Aula 101" },
  { id: 2, nombre: "Proyector-01", valor: 1000000, tipo: "Proyector", asignadoAula: "Aula 101" },
  { id: 3, nombre: "Impresora-01", valor: 800000, tipo: "Impresora" },
  { id: 4, nombre: "PC-02", valor: 2000000, tipo: "Computador", asignadoAula: "Aula 102" },
  { id: 5, nombre: "Proyector-02", valor: 1000000, tipo: "Proyector" }
];

// 1. Equipos no asignados
function equiposDisponibles() {
  return equipos.filter(e => !e.asignadoAula);
}

// 2. Equipos asignados a un aula
function equiposPorAula(nombreAula: string) {
  return equipos.filter(e => e.asignadoAula === nombreAula);
}

// 3. Generar inventario
function generarInventario() {
  return aulas.map(aula => ({
    aula: aula.nombre,
    equipos: equiposPorAula(aula.nombre)
  }));
}

// 4. Aulas sin proyector
function aulasSinProyector() {
  return aulas.filter(aula => {
    const equiposAula = equiposPorAula(aula.nombre);
    return !equiposAula.some(e => e.tipo === "Proyector");
  });
}

// 5. Valor total por aula
function valorTotalPorAula() {
  const resultado: Record<string, number> = {};
  aulas.forEach(aula => {
    const total = equipos
      .filter(e => e.asignadoAula === aula.nombre)
      .reduce((sum, e) => sum + e.valor, 0);
    resultado[aula.nombre] = total;
  });
  return resultado;
}

// Interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Seleccione opción (1: Equipos disponibles, 2: Equipos por aula, 3: Inventario, 4: Aulas sin proyector, 5: Valor por aula): ", (opcion) => {
  switch (opcion) {
    case "1":
      console.log(equiposDisponibles());
      rl.close();
      break;
    case "2":
      rl.question("Nombre del aula: ", (nombre) => {
        console.log(equiposPorAula(nombre));
        rl.close();
      });
      break;
    case "3":
      console.log(generarInventario());
      rl.close();
      break;
    case "4":
      console.log(aulasSinProyector());
      rl.close();
      break;
    case "5":
      console.log(valorTotalPorAula());
      rl.close();
      break;
    default:
      console.log("Opción no válida");
      rl.close();
  }
});
