import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese el estado de la luz: ", (estadoLuz: string) => {
    estadoLuz = estadoLuz.toLowerCase();

    switch (estadoLuz) {
        case "encendida":
            console.log("La luz está encendida");
            break;
        case "apagada":
            console.log("La luz está apagada");
            break;
        case "parpadeando":
            console.log("La luz está parpadeando");
            break;
        case "rojo":
            console.log("La luz está en color rojo");
            break;
        default:
            console.log("Estado de la luz desconocido");
            break;
    }

    rl.close();
});
