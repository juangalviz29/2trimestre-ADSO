import * as readline from "readline";

type Especialidad = 'Cardiología' | 'Pediatría' | 'Dermatología' | 'General';

interface Paciente {
  id: number;
  nombre: string;
}

interface Medico {
  id: number;
  nombre: string;
  especialidad: Especialidad;
}

interface Cita {
  id: number;
  pacienteId: number;
  medicoId: number;
  fecha: string; // formato: YYYY-MM-DD
  hora: string;  // formato: HH:mm
}

const pacientes: Paciente[] = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "Ana Gómez" }
];

const medicos: Medico[] = [
  { id: 1, nombre: "Dr. Torres", especialidad: "Cardiología" },
  { id: 2, nombre: "Dra. Rivas", especialidad: "Pediatría" }
];

const citas: Cita[] = [
  { id: 1, pacienteId: 1, medicoId: 1, fecha: "2025-05-14", hora: "09:00" },
  { id: 2, pacienteId: 2, medicoId: 2, fecha: "2025-05-14", hora: "11:00" },
  { id: 3, pacienteId: 1, medicoId: 2, fecha: "2025-05-15", hora: "10:00" }
];

function filtrarCitasPorEspecialidad(especialidad: Especialidad) {
  return citas.filter(cita => {
    const medico = medicos.find(m => m.id === cita.medicoId);
    return medico?.especialidad === especialidad;
  });
}

function obtenerCitasDePaciente(pacienteId: number) {
  return citas.filter(cita => cita.pacienteId === pacienteId);
}

function listarCitasPorFecha(fecha: string) {
  return citas.filter(cita => cita.fecha === fecha);
}

function generarReporteDiario(fecha: string) {
  return citas
    .filter(cita => cita.fecha === fecha)
    .map(cita => {
      const paciente = pacientes.find(p => p.id === cita.pacienteId);
      const medico = medicos.find(m => m.id === cita.medicoId);
      return `Cita: ${cita.hora}, Paciente: ${paciente?.nombre}, Médico: ${medico?.nombre}`;
    });
}

function verificarDisponibilidad(medicoId: number, fecha: string, hora: string) {
  return !citas.some(c => c.medicoId === medicoId && c.fecha === fecha && c.hora === hora);
}

// --- Interfaz de consola ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingrese una opción (1: Citas por especialidad, 2: Citas por paciente, 3: Citas por fecha, 4: Reporte diario, 5: Verificar disponibilidad): ", (opcion) => {
  switch (opcion) {
    case '1':
      rl.question("Especialidad (Cardiología, Pediatría, Dermatología, General): ", (esp) => {
        console.log(filtrarCitasPorEspecialidad(esp as Especialidad));
        rl.close();
      });
      break;
    case '2':
      rl.question("ID del paciente: ", (id) => {
        console.log(obtenerCitasDePaciente(parseInt(id)));
        rl.close();
      });
      break;
    case '3':
      rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {
        console.log(listarCitasPorFecha(fecha));
        rl.close();
      });
      break;
    case '4':
      rl.question("Fecha para reporte (YYYY-MM-DD): ", (fecha) => {
        console.log(generarReporteDiario(fecha));
        rl.close();
      });
      break;
    case '5':
      rl.question("ID del médico: ", (idMedico) => {
        rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {
          rl.question("Hora (HH:mm): ", (hora) => {
            const disponible = verificarDisponibilidad(parseInt(idMedico), fecha, hora);
            console.log(disponible ? "Disponible" : "No disponible");
            rl.close();
          });
        });
      });
      break;
    default:
      console.log("Opción no válida.");
      rl.close();
  }
});
