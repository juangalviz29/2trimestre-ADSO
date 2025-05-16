import * as readline from 'readline';

type DuracionMensualidad = "15 días" | "30 días" | "3 meses";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularCostoMensualidad(duracion: DuracionMensualidad): number | null {
    if (duracion === "15 días") {
        return 18000;
    } else if (duracion === "30 días") {
        return 35000;
    } else if (duracion === "3 meses") {
        return 86000;
    } else {
        return null;
    }
}

function mostrarResultado(duracion: string, costo: number | null): void {
    if (costo === null) {
        console.log("Duración no válida. Las opciones son: '15 días', '30 días' o '3 meses'");
    } else {
        console.log(`El costo para ${duracion} es: $${costo.toLocaleString()}`);
    }
}

function calcularMensualidad(duracion: DuracionMensualidad): void {
    const costo = calcularCostoMensualidad(duracion);
    mostrarResultado(duracion, costo);
}

async function obtenerDuracion(): Promise<string> {
    return new Promise((resolve) => {
        rl.question('Ingrese la duración ("15 días", "30 días" o "3 meses"): ', (input) => {
            resolve(input.trim());
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Calculadora de costos de mensualidad\n");
        
        const duracionInput = await obtenerDuracion();
        const duracionValida: DuracionMensualidad[] = ["15 días", "30 días", "3 meses"];
        
        if (duracionValida.includes(duracionInput as DuracionMensualidad)) {
            calcularMensualidad(duracionInput as DuracionMensualidad);
        } else {
            mostrarResultado(duracionInput, null);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();