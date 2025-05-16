import * as readline from "readline";

type Estado = "pendiente" | "en preparación" | "lista" | "entregada";

interface Plato {
  id: number;
  nombre: string;
  precio: number;
}

interface Comanda {
  id: number;
  mesa: number;
  platos: number[];
  estado: Estado;
  hora: string; // HH:mm
  fecha: string; // YYYY-MM-DD
}

const platos: Plato[] = [
  { id: 1, nombre: "Hamburguesa", precio: 20000 },
  { id: 2, nombre: "Pizza", precio: 25000 },
  { id: 3, nombre: "Ensalada", precio: 15000 }
];

const comandas: Comanda[] = [
  { id: 1, mesa: 1, platos: [1, 2], estado: "pendiente", hora: "12:00", fecha: "2025-05-13" },
  { id: 2, mesa: 2, platos: [3], estado: "en preparación", hora: "13:00", fecha: "2025-05-13" },
  { id: 3, mesa: 1, platos: [1, 1], estado: "entregada", hora: "14:00", fecha: "2025-05-12" }
];

function filtrarComandasPorEstado(estado: Estado) {
  return comandas.filter(c => c.estado === estado);
}

function calcularTotalPorMesa(mesa: number) {
  const comandasMesa = comandas.filter(c => c.mesa === mesa);
  return comandasMesa.reduce((total, comanda) => {
    const subtotal = comanda.platos.reduce((sum, id) => {
      const plato = platos.find(p => p.id === id);
      return sum + (plato?.precio || 0);
    }, 0);
    return total + subtotal;
  }, 0);
}

function transformarParaCocina() {
  return comandas.map(c => ({
    mesa: c.mesa,
    platos: c.platos.map(id => platos.find(p => p.id === id)?.nombre)
  }));
}

function platosMasVendidos(fechaInicio: string, fechaFin: string) {
  const conteo: Record<number, number> = {};

  const dentroDelRango = (fecha: string) =>
    fecha >= fechaInicio && fecha <= fechaFin;

  comandas.filter(c => dentroDelRango(c.fecha)).forEach(comanda => {
    comanda.platos.forEach(id => {
      conteo[id] = (conteo[id] || 0) + 1;
    });
  });

  return Object.entries(conteo)
    .sort(([, a], [, b]) => b - a)
    .map(([id, cantidad]) => ({
      plato: platos.find(p => p.id === Number(id))?.nombre,
      cantidad
    }));
}

function agruparComandasPorHora() {
  const agrupadas: Record<string, number> = {};
  comandas.forEach(c => {
    const hora = c.hora.split(":")[0] + ":00";
    agrupadas[hora] = (agrupadas[hora] || 0) + 1;
  });
  return agrupadas;
}

// Interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Seleccione opción (1: Filtrar por estado, 2: Total por mesa, 3: Datos para cocina, 4: Platos más vendidos, 5: Comandas por hora): ", (opcion) => {
  switch (opcion) {
    case "1":
      rl.question("Estado (pendiente, en preparación, lista, entregada): ", (estado) => {
        console.log(filtrarComandasPorEstado(estado as Estado));
        rl.close();
      });
      break;
    case "2":
      rl.question("Número de mesa: ", (mesa) => {
        console.log("Total: $" + calcularTotalPorMesa(parseInt(mesa)));
        rl.close();
      });
      break;
    case "3":
      console.log(transformarParaCocina());
      rl.close();
      break;
    case "4":
      rl.question("Fecha inicio (YYYY-MM-DD): ", (inicio) => {
        rl.question("Fecha fin (YYYY-MM-DD): ", (fin) => {
          console.log(platosMasVendidos(inicio, fin));
          rl.close();
        });
      });
      break;
    case "5":
      console.log(agruparComandasPorHora());
      rl.close();
      break;
    default:
      console.log("Opción no válida");
      rl.close();
  }
});
