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

let continuar = true;

(async () => {
  while (continuar) {
    const angulo1Input = await pregunta('Ingrese el primer ángulo (o escriba "salir" para terminar): ');

    if (angulo1Input.toLowerCase() === 'salir') {
      continuar = false;
    } else {
      const angulo2Input = await pregunta('Ingrese el segundo ángulo: ');
      const angulo3Input = await pregunta('Ingrese el tercer ángulo: ');

      const angulo1 = parseFloat(angulo1Input);
      const angulo2 = parseFloat(angulo2Input);
      const angulo3 = parseFloat(angulo3Input);

      if (isNaN(angulo1) || isNaN(angulo2) || isNaN(angulo3)) {
        console.log("¡Error! Ingrese valores numéricos válidos para los ángulos.");
      } else {
        const sumaAngulos = angulo1 + angulo2 + angulo3;

        if (sumaAngulos === 180) {
          console.log("El triángulo es válido.");
        } else {
          console.log("El triángulo no es válido.");
        }
      }
    }
  }

  console.log("Gracias por usar el sistema. ¡Hasta luego!");
  rl.close();
})();
