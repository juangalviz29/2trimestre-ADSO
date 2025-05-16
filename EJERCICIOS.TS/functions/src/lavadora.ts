import * as readline from 'readline';

type TipoLavadora = 1 | 2;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function costoBase(tipo: TipoLavadora, cantidad: number, horas: number): number | null {
    if (tipo === 1) {
        return cantidad * horas * 4000;
    } else if (tipo === 2) {
        return cantidad * horas * 3000;
    } else {
        return null;
    }
}

function aplicarDescuento(costo: number, cantidad: number): number {
    if (cantidad > 3) {
        return costo * 0.97; 
    }
    return costo;
}

function mostrarCosto(tipo: TipoLavadora, cantidad: number, horas: number, costo: number | null): void {
    if (costo === null) {
        console.log("Tipo de lavadora no válido. Debe ser 1 o 2.");
    } else {
        console.log(`Costo total por alquilar ${cantidad} lavadoras tipo ${tipo} por ${horas} horas: $${costo.toFixed(2)}.`);
    }
}

function calcularAlquiler(tipo: TipoLavadora, cantidad: number, horas: number): void {
    const base = costoBase(tipo, cantidad, horas);

    if (base === null) {
        mostrarCosto(tipo, cantidad, horas, null);
    } else {
        const total = aplicarDescuento(base, cantidad);
        mostrarCosto(tipo, cantidad, horas, total);
    }
}

async function obtenerEntradaNumerica(pregunta: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(pregunta, (input) => {
            const numero = parseInt(input);
            resolve(isNaN(numero) ? -1 : numero);
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Sistema de cálculo de alquiler de lavadoras\n");

        const tipo = await obtenerEntradaNumerica("Ingrese el tipo de lavadora (1 o 2): ") as TipoLavadora;
        const cantidad = await obtenerEntradaNumerica("Ingrese la cantidad de lavadoras: ");
        const horas = await obtenerEntradaNumerica("Ingrese las horas de alquiler: ");

        if (tipo !== 1 && tipo !== 2) {
            console.log("Error: Tipo de lavadora debe ser 1 o 2");
        } else if (cantidad <= 0 || horas <= 0) {
            console.log("Error: Cantidad y horas deben ser números positivos");
        } else {
            calcularAlquiler(tipo, cantidad, horas);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();