import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function calcularCostoOperador() {
    try {
       
        console.log("Operadores disponibles:");
        console.log("- Tigo");
        console.log("- Claro");
        console.log("- Movistar");

        const operador = await new Promise<string>(resolve => {
            rl.question('\nIngrese el operador celular: ', resolve);
        });

        const minutosInput = await new Promise<string>(resolve => {
            rl.question('Ingrese los minutos internacionales consumidos: ', resolve);
        });
        const minutosInternacionales = parseInt(minutosInput);

        if (isNaN(minutosInternacionales) || minutosInternacionales < 0) {
            console.log("Error: Los minutos deben ser un número positivo.");
            return;
        }

        let cargoFijo = 0;
        let valorMinutoInternacional = 0;
        let valorPaqueteDatos = 0;

        switch (operador.toLowerCase()) {
            case "tigo":
                cargoFijo = 45000;
                valorMinutoInternacional = 200;
                valorPaqueteDatos = 12000;
                break;
            case "claro":
                cargoFijo = 30000;
                valorMinutoInternacional = 100;
                valorPaqueteDatos = 18000;
                break;
            case "movistar":
                cargoFijo = 40000;
                valorMinutoInternacional = 250;
                valorPaqueteDatos = 8000;
                break;
            default:
                console.log("Operador no válido. Por favor ingrese Tigo, Claro o Movistar.");
                return;
        }

        const costoTotal = cargoFijo + (minutosInternacionales * valorMinutoInternacional) + valorPaqueteDatos;

        console.log("\n--- Factura Detallada ---");
        console.log(`Operador: ${operador}`);
        console.log(`Cargo fijo: $${cargoFijo.toLocaleString()}`);
        console.log(`Minutos internacionales: ${minutosInternacionales} x $${valorMinutoInternacional.toLocaleString()}`);
        console.log(`Paquete de datos: $${valorPaqueteDatos.toLocaleString()}`);
        console.log("-------------------------");
        console.log(`Costo total: $${costoTotal.toLocaleString()}`);
        console.log("-------------------------");

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

calcularCostoOperador();