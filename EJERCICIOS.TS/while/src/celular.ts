import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntarEstado() {
  rl.question('Ingrese el estado del dispositivo (prendido, apagado, bajo, cargado) o escriba "salir" para terminar: ', (input: string) => {
    const estado = input.trim().toLowerCase();

    if (estado === 'salir') {
      console.log('Gracias por usar el sistema. ¡Hasta luego!');
      rl.close();
      return;
    }

    if (estado === 'prendido') {
      console.log('El dispositivo está prendido, puede usarlo.');
    } else if (estado === 'apagado') {
      console.log('El dispositivo está apagado, debe prenderlo.');
    } else if (estado === 'bajo') {
      console.log('El dispositivo está bajo, por favor cargue la batería.');
    } else if (estado === 'cargado') {
      console.log('El dispositivo está cargado, puede desconectar su dispositivo.');
    } else {
      console.log(`Estado "${input}" no reconocido, verifique el dispositivo.`);
    }

    preguntarEstado();
  });
}

preguntarEstado();