import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pregunta(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (respuesta: string) => {
      resolve(respuesta.toLowerCase());
    });
  });
}

let continuar = true;

(async () => {
  while (continuar) {
    const tipoReserva = await pregunta('Ingrese el tipo de reserva (individual/grupo/especial) o escriba "salir" para terminar: ');

    if (tipoReserva === 'salir') {
      continuar = false;
    } else {
      if (tipoReserva === "individual") {
        console.log(`Su mesa está lista en la zona tranquila, por ser reserva ${tipoReserva}.`);
      } else if (tipoReserva === "grupo") {
        console.log("Se le ha asignado una mesa en la zona de grupos para su atención.");
      } else if (tipoReserva === "especial") {
        console.log("Su mesa está reservada en la zona VIP, disfrute de su experiencia.");
      } else {
        console.log("No se encontró su reserva, por favor diríjase a la recepción.");
      }
    }
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
})();
