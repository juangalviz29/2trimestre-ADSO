import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function calcularCostoLavadoras() {
    try {
      
        const tipoInput = await new Promise<string>(resolve => {
            rl.question('Ingrese el tipo de lavadora (1 o 2): ', resolve);
        });
        const tipoLavadora = parseInt(tipoInput);

        const cantidadInput = await new Promise<string>(resolve => {
            rl.question('Ingrese la cantidad de lavadoras: ', resolve);
        });
        const cantidad = parseInt(cantidadInput);

        const horasInput = await new Promise<string>(resolve => {
            rl.question('Ingrese las horas de alquiler: ', resolve);
        });
        const horas = parseInt(horasInput);

        if (isNaN(tipoLavadora) || isNaN(cantidad) || isNaN(horas)) {
            console.log("Error: Todos los valores deben ser números.");
            return;
        }

        if (cantidad <= 0 || horas <= 0) {
            console.log("Error: La cantidad y horas deben ser mayores a 0.");
            return;
        }

        let costoTotal: number;

        if (tipoLavadora === 1) {
            costoTotal = cantidad * horas * 4000;
        } else if (tipoLavadora === 2) {
            costoTotal = cantidad * horas * 3000;
        } else {
            console.log("Tipo de lavadora no válido. Debe ser 1 o 2.");
            return;
        }

        if (cantidad > 3) {
            costoTotal *= 0.97; 
            console.log("¡Se aplicó un 3% de descuento por alquilar más de 3 lavadoras!");
        }

        console.log(`\nResumen del alquiler:`);
        console.log(`- Tipo de lavadora: ${tipoLavadora}`);
        console.log(`- Cantidad: ${cantidad}`);
        console.log(`- Horas: ${horas}`);
        console.log(`Costo total: $${costoTotal.toLocaleString()}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

calcularCostoLavadoras();