import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const TEMPERATURA_MINIMA = 100;
const TEMPERATURA_MAXIMA = 250;

rl.question('¿Está encendido el horno? (si/no): ', (respuestaEncendido) => {
    const hornoEncendido = respuestaEncendido.toLowerCase().trim() === 'si';

    if (hornoEncendido) {
        rl.question('Ingrese la temperatura actual del horno (en °C): ', (tempInput) => {
            const temperatura = parseInt(tempInput);

            if (isNaN(temperatura)) {
                console.log('Error: Ingrese un valor numérico válido para la temperatura');
            } else {
                console.log('El horno está encendido');

                if (temperatura < TEMPERATURA_MINIMA) {
                    console.log('Temperatura demasiado baja, ajuste la temperatura.');
                } else if (temperatura >= TEMPERATURA_MINIMA && temperatura <= TEMPERATURA_MAXIMA) {
                    console.log('Temperatura adecuada para hornear.');
                } else {
                    console.log('¡Atención! Temperatura excesiva, evite un incendio.');
                }
            }
            rl.close();
        });
    } else {
        console.log('Asegúrese de encender el horno.');
        rl.close();
    }
});