import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("¿Está encendido el horno? : ", (respuestaHorno: string) => {
    let hornoEncendido: boolean = respuestaHorno.toLowerCase() === "sí" || respuestaHorno.toLowerCase() === "si";

    if (hornoEncendido) {
        console.log('El horno está encendido.');

        rl.question("Ingrese la temperatura del horno en grados Celsius: ", (temperaturaInput: string) => {
            let temperatura: number = parseFloat(temperaturaInput);

            switch (true) {
                case (temperatura < 100):
                    console.log('Temperatura demasiado baja. Ajuste la temperatura.');
                    break;
                case (temperatura >= 100 && temperatura <= 250):
                    console.log('Temperatura adecuada para hornear.');
                    break;
                case (temperatura > 250):
                    console.log('¡Atención! Temperatura excesiva. Evite un incendio.');
                    break;
                default:
                    console.log('Temperatura no válida.');
                    break;
            }

            rl.close();
        });
    } else {
        console.log('Asegúrese de encender el horno.');
        rl.close();
    }
});
