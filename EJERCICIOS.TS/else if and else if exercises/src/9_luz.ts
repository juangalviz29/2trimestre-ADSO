import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

type EstadoLuz = 'encendida' | 'apagada' | 'parpadeando' | 'rojo';

rl.question('Ingrese el estado de la luz (encendida/apagada/parpadeando/rojo): ', (estadoInput) => {
    const estado = estadoInput.toLowerCase().trim() as EstadoLuz;

    if (estado === 'encendida') {
        console.log("La luz está encendida");
    }
    else if (estado === 'apagada') {
        console.log("La luz está apagada");
    }
    else if (estado === 'parpadeando') {
        console.log("La luz está parpadeando");
    }
    else if (estado === 'rojo') {
        console.log("La luz está en color rojo");
    }
    else {
        console.log("Estado de la luz desconocido");
    }

    rl.close();
});