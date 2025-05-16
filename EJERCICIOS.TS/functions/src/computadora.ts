import * as readline from 'readline';

type EstadoComputadora = {
    emitePitido: boolean;
    discoDuroGira: boolean;
};

function evaluarEstadoComputadora(emitePitido: boolean, discoDuroGira: boolean): string {
    if (emitePitido && discoDuroGira) {
        return "Póngase en contacto con el técnico de apoyo.";
    } else if (emitePitido && !discoDuroGira) {
        return "Verificar contactos de la unidad.";
    } else if (!emitePitido && !discoDuroGira) {
        return "Traiga la computadora para repararla en la central.";
    } else if (!emitePitido && discoDuroGira) {
        return "Compruebe las conexiones de altavoces.";
    } else {
        return "Estado no válido.";
    }
}

function mostrarMensaje(emitePitido: boolean, discoDuroGira: boolean): void {
    const mensaje = evaluarEstadoComputadora(emitePitido, discoDuroGira);
    console.log(mensaje);
}

function diagnosticarComputadora(emitePitido: boolean, discoDuroGira: boolean): void {
    mostrarMensaje(emitePitido, discoDuroGira);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function obtenerEntradaBooleana(pregunta: string): Promise<boolean> {
    return new Promise((resolve) => {
        rl.question(pregunta + ' (s/n): ', (respuesta) => {
            resolve(respuesta.toLowerCase() === 's');
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log('Diagnóstico de la computadora:');
        const emitePitido = await obtenerEntradaBooleana('¿La computadora emite pitidos?');
        const discoDuroGira = await obtenerEntradaBooleana('¿El disco duro gira?');
        
        diagnosticarComputadora(emitePitido, discoDuroGira);
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
    }
}

main();