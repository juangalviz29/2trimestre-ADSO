import * as readline from 'readline';

// Utilidades para colorear texto
const colores = {
  rojo: (text: string) => `\x1b[31m${text}\x1b[0m`,     // Rojo
  verde: (text: string) => `\x1b[32m${text}\x1b[0m`,    // Verde
  amarillo: (text: string) => `\x1b[33m${text}\x1b[0m`, // Amarillo
  azul: (text: string) => `\x1b[34m${text}\x1b[0m`,     // Azul
};

// Crear interfaz readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("¿Desea prender el semáforo? (escribe 'si' o 'no'): ", (interrutor) => {
  if (interrutor.toLowerCase() === "si") {
    console.log(colores.azul("El semáforo está prendido.\n"));

    rl.question("Indica el color del semáforo (rojo, amarillo o verde): ", (colorSemaforo) => {
      let mensaje: string;

      switch (colorSemaforo.toLowerCase()) {
        case "rojo":
          mensaje = colores.rojo("🚦 Detente. Semáforo en rojo.");
          break;
        case "amarillo":
          mensaje = colores.amarillo("⚠️  Prepárate. Semáforo en amarillo.");
          break;
        case "verde":
          mensaje = colores.verde("✅ Adelante. Semáforo en verde.");
          break;
        default:
          mensaje = colores.azul("❌ Color no reconocido. Semáforo dañado.");
      }

      console.log("\n" + mensaje);
      rl.close();
    });

  } else if (interrutor.toLowerCase() === "no") {
    console.log(colores.azul("Fin del programa."));
    rl.close();
  } else {
    console.log(colores.rojo("Opción no válida."));
    rl.close();
  }
});
