import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingrese el tamaño de el sandwich (pequeño/grande): ", (tamaño: string) => {
  tamaño = tamaño.toLowerCase();

  let costoBase: number = 0;

  switch (tamaño) {
    case "pequeño":
      costoBase = 6000;
      break;
    case "grande":
      costoBase = 12000;
      break;
    default:
      console.log("Tamaño no válido.");
      rl.close();
      return;
  }

  rl.question("¿Desea tocineta? (sí/no): ", (tocinetaInput: string) => {
    let tocineta: boolean = tocinetaInput.toLowerCase() === "sí" || tocinetaInput.toLowerCase() === "si";

    rl.question("¿Desea jalapeño? (sí/no): ", (jalapeñoInput: string) => {
      let jalapeño: boolean = jalapeñoInput.toLowerCase() === "sí" || jalapeñoInput.toLowerCase() === "si";

      rl.question("¿Desea pavo? (sí/no): ", (pavoInput: string) => {
        let pavo: boolean = pavoInput.toLowerCase() === "sí" || pavoInput.toLowerCase() === "si";

        rl.question("¿Desea queso? (sí/no): ", (quesoInput: string) => {
          let queso: boolean = quesoInput.toLowerCase() === "sí" || quesoInput.toLowerCase() === "si";

          let costoIngredientes: number = 0;
          if (tocineta) {
            costoIngredientes += 3000;
          }
          if (jalapeño) {
            costoIngredientes += 0;
          }
          if (pavo) {
            costoIngredientes += 3000;
          }
          if (queso) {
            costoIngredientes += 2500;
          }

          let costoTotal: number = costoBase + costoIngredientes;

          console.log(`El costo total de su pedido es: $${costoTotal}`);
          rl.close();
        });
      });
    });
  });
});
