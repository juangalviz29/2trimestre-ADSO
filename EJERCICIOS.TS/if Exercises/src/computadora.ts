import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function preguntaSiNo(pregunta: string): Promise<boolean> {
    return new Promise((resolve) => {
        rl.question(`${pregunta} (s/n): `, (respuesta) => {
            resolve(respuesta.toLowerCase() === 's');
        });
    });
}

async function diagnosticarComputadora() {
    try {
        console.log('Diagnóstico de la computadora\n');
        
        const emitePitido = await preguntaSiNo('¿La computadora emite pitidos?');
        const discoDuroGira = await preguntaSiNo('¿El disco duro gira?');

        if (emitePitido && discoDuroGira) {
            console.log("\nPóngase en contacto con el técnico de apoyo.");
        } else if (emitePitido && !discoDuroGira) {
            console.log("\nVerificar contactos de la unidad.");
        } else if (!emitePitido && !discoDuroGira) {
            console.log("\nTraiga la computadora para repararla en la central.");
        } else if (!emitePitido && discoDuroGira) {
            console.log("\nCompruebe las conexiones de altavoces.");
        } else {
            console.log("\nEstado no válido.");
        }

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

diagnosticarComputadora();