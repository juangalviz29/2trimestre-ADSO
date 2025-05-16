import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function calcularCostoMensualidad() {
    try {

        console.log("Opciones de duración disponibles:");
        console.log("1. 15 días");
        console.log("2. 30 días");
        console.log("3. 3 meses");

        const duracionInput = await new Promise<string>(resolve => {
            rl.question('\nIngrese la duración (ej: "15 días", "30 días", "3 meses"): ', resolve);
        });

        let costo = 0;
        const duracion = duracionInput.toLowerCase();

        if (duracion === "15 días" || duracion === "15 dias") {
            costo = 18000;
        } else if (duracion === "30 días" || duracion === "30 dias") {
            costo = 35000;
        } else if (duracion === "3 meses") {
            costo = 86000;
        } else {
            console.log("Duración no válida. Por favor ingrese una de las opciones mostradas.");
            return;
        }

        console.log(`\nResumen:`);
        console.log(`- Duración seleccionada: ${duracionInput}`);
        console.log(`- Costo de la mensualidad: $${costo.toLocaleString()}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

calcularCostoMensualidad();