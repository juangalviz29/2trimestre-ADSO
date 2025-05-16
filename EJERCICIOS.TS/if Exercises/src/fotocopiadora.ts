import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function calcularPrecioCopias() {
    try {

        const input = await new Promise<string>((resolve) => {
            rl.question('Ingrese la cantidad de copias: ', resolve);
        });

        const cantidadCopias = parseInt(input);

        if (isNaN(cantidadCopias) || cantidadCopias < 0) {
            console.log("Cantidad de copias no válida.");
            return;
        }

        let precioPorCopia = 0;
        let precioTotal = 0;

        if (cantidadCopias >= 0 && cantidadCopias <= 499) {
            precioPorCopia = 120;
        } else if (cantidadCopias >= 500 && cantidadCopias <= 749) {
            precioPorCopia = 100;
        } else if (cantidadCopias >= 750 && cantidadCopias <= 999) {
            precioPorCopia = 80;
        } else if (cantidadCopias >= 1000) {
            precioPorCopia = 50;
        }

        precioTotal = cantidadCopias * precioPorCopia;

        console.log(`\nResumen:`);
        console.log(`- Cantidad de copias: ${cantidadCopias}`);
        console.log(`- Precio por copia: $${precioPorCopia}`);
        console.log(`- Precio total: $${precioTotal}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

calcularPrecioCopias();