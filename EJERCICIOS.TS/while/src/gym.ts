import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
    const nombreUsuario = await pregunta('Ingrese su nombre (o escriba "salir" para terminar): ');

    if (nombreUsuario.toLowerCase() === 'salir') {
      continuar = false;
    } else {
      const membresiaInput = await pregunta('¿Tiene una membresía activa? (si/no): ');
      const membresiaActiva = membresiaInput.toLowerCase() === 'si';

      if (nombreUsuario.toLowerCase() === "juan pablo" && membresiaActiva) {
        console.log(`Hola ${nombreUsuario}, bienvenido al gimnasio. ¡Listo para entrenar!`);
      } else {
        console.log(`Lo sentimos, ${nombreUsuario}. Necesitas una membresía activa para acceder al gimnasio.`);
      }
    }
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
}

main();
