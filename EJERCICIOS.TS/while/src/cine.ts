import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function verificarEstadoSala(ocupacionSala: boolean, numeroSala: string): string {
  if (ocupacionSala) {
    return "La sala número " + numeroSala + " está ocupada.";
  } else {
    return "La sala número " + numeroSala + " está disponible.";
  }
}

function pregunta(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (respuesta: string) => {
      resolve(respuesta);
    });
  });
}

async function main() {
  let continuar = true;

  while (continuar) {
    const numeroSala = await pregunta('Ingrese el número de sala (o escriba "salir" para terminar): ');

    if (numeroSala.toLowerCase() === 'salir') {
      console.log("Gracias por usar el sistema. ¡Hasta luego!");
      continuar = false;
    } else {
      const respuesta = await pregunta('¿La sala está ocupada? (si/no): ');
      const ocupacionSala = respuesta.toLowerCase() === 'si';

      const mensaje = verificarEstadoSala(ocupacionSala, numeroSala);
      console.log(mensaje);
    }
  }

  rl.close();
}

main();
