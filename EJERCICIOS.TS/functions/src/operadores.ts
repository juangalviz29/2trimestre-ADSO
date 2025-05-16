import * as readline from 'readline';

type Operador = "Tigo" | "Claro" | "Movistar";

interface ValoresOperador {
    cargoFijo: number;
    minuto: number;
    datos: number;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function obtenerValores(operador: Operador): ValoresOperador | null {
    if (operador === "Tigo") {
        return { cargoFijo: 45000, minuto: 200, datos: 12000 };
    } else if (operador === "Claro") {
        return { cargoFijo: 30000, minuto: 100, datos: 18000 };
    } else if (operador === "Movistar") {
        return { cargoFijo: 40000, minuto: 250, datos: 8000 };
    } else {
        return null;
    }
}

function calcularTotal(cargoFijo: number, minuto: number, datos: number, minutosUsados: number): number {
    return cargoFijo + (minuto * minutosUsados) + datos;
}

function mostrarResultado(operador: Operador, cargoFijo: number, minuto: number, datos: number, total: number): void {
    console.log("\nDetalle de la factura:");
    console.log(`Operador: ${operador}`);
    console.log(`Cargo fijo: $${cargoFijo.toLocaleString()}`);
    console.log(`Costo por minuto internacional: $${minuto.toLocaleString()}`);
    console.log(`Costo del paquete de datos: $${datos.toLocaleString()}`);
    console.log(`Costo total: $${total.toLocaleString()}\n`);
}

function calcularFactura(operador: Operador, minutosUsados: number): void {
    const valores = obtenerValores(operador);

    if (valores === null) {
        console.log("Operador no válido. Las opciones son: Tigo, Claro o Movistar");
    } else {
        const total = calcularTotal(valores.cargoFijo, valores.minuto, valores.datos, minutosUsados);
        mostrarResultado(operador, valores.cargoFijo, valores.minuto, valores.datos, total);
    }
}

async function obtenerEntrada(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pregunta, (input) => {
            resolve(input.trim());
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Calculadora de factura de telefonía móvil\n");

        const operadorInput = await obtenerEntrada("Ingrese el operador (Tigo/Claro/Movistar): ");
        const minutosInput = await obtenerEntrada("Ingrese los minutos internacionales usados: ");

        const operador = operadorInput as Operador;
        const minutosUsados = parseFloat(minutosInput);

        if (!["Tigo", "Claro", "Movistar"].includes(operador)) {
            console.log("Error: Operador no válido. Debe ser Tigo, Claro o Movistar");
        } else if (isNaN(minutosUsados) || minutosUsados < 0) {
            console.log("Error: Los minutos deben ser un número positivo");
        } else {
            calcularFactura(operador, minutosUsados);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();