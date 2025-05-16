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

const edadMinima = 18;
const codigoMiembro = "ABC123";

async function main() {
  let continuar = true;

  while (continuar) {
    const nombreMiembro = await pregunta('Ingrese su nombre: ');
    const edadMiembro = await pregunta('Ingrese su edad: ');
    const codigoIngresado = await pregunta('Ingrese su código de miembro: ');

    const edad = parseInt(edadMiembro, 10);

    if (edad >= edadMinima && codigoMiembro === codigoIngresado) {
      console.log(`Buenas noches ${nombreMiembro}, ¡bienvenido al club! Disfrute de sus privilegios.`);
    } else {
      console.log("Acceso denegado...");
    }

    const respuesta = await pregunta('¿Desea verificar otro miembro? (si/no): ');
    if (respuesta.toLowerCase() !== 'si') {
      continuar = false;
    }
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
}

main();
