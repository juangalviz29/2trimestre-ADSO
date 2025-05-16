import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pregunta(prompt: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(prompt, (respuesta: string) => {
      resolve(respuesta.trim().toLowerCase() === 'si');
    });
  });
}

async function main() {
  let continuar = true;

  while (continuar) {
    const emitePitido = await pregunta('¿La computadora emite un pitido? (si/no): ');
    const discoDuroGira = await pregunta('¿El disco duro está girando? (si/no): ');

    if (emitePitido && discoDuroGira) {
      console.log("Póngase en contacto con el técnico de apoyo.");
    } else if (emitePitido && !discoDuroGira) {
      console.log("Verificar contactos de la unidad.");
    } else if (!emitePitido && !discoDuroGira) {
      console.log("Traiga la computadora para repararla en la central.");
    } else if (!emitePitido && discoDuroGira) {
      console.log("Compruebe las conexiones de altavoces.");
    } else {
      console.log("Estado no válido.");
    }

    continuar = await pregunta('¿Desea realizar otro diagnóstico? (si/no): ');
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
}

main();
