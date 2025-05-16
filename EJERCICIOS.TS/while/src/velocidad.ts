import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (respuesta: string) => {
      resolve(respuesta);
    });
  });
}

const limiteVelocidad: number = 60;
let continuar: boolean = true;

(async () => {
  while (continuar) {
    const velocidadInput = await pregunta('Ingrese la velocidad (o escriba "salir" para terminar): ');

    if (velocidadInput.toLowerCase() === 'salir') {
      continuar = false;
    } else {
      const velocidad: number = parseFloat(velocidadInput);

      if (isNaN(velocidad)) {
        console.log("¡Error! Ingrese un valor numérico válido.");
      } else {
        if (velocidad > limiteVelocidad) {
          console.log(`Usted está excediendo el límite de velocidad, su velocidad es de ${velocidad} km/h.`);
        } else {
          console.log("Su velocidad es dentro del límite permitido.");
        }
      }
    }
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
})();
