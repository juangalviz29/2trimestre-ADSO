import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pregunta(pregunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta: string) => {
      resolve(respuesta);
    });
  });
}

async function main() {
  let continuar = true;

  while (continuar) {
    const input = await pregunta('Ingrese el número de modelo (o escriba "salir" para terminar): ');

    if (input.toLowerCase() === 'salir') {
      console.log("Gracias por usar el sistema. ¡Hasta luego!");
      continuar = false;
      rl.close();
      break;
    }

    const numeroModelo = parseInt(input, 10);

    if (isNaN(numeroModelo)) {
      console.log("Por favor, ingrese un número válido.");
    } else {
      if (
        numeroModelo === 119 ||
        numeroModelo === 179 ||
        (numeroModelo >= 189 && numeroModelo <= 195) ||
        numeroModelo === 221 ||
        numeroModelo === 780
      ) {
        console.log("El automóvil está defectuoso, llevar a garantía.");
      } else {
        console.log("Su automóvil no está defectuoso.");
      }
    }
  }
}

main();

