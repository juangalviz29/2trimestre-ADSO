import * as readline from 'readline';

type RangoPrecio = {
    min: number;
    max: number;
    precio: number;
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const rangosPrecios: RangoPrecio[] = [
    { min: 0, max: 499, precio: 120 },
    { min: 500, max: 749, precio: 100 },
    { min: 750, max: 999, precio: 80 },
    { min: 1000, max: Infinity, precio: 50 }
];

function calcularPrecioPorCopia(cantidadCopias: number): number | null {
    if (cantidadCopias < 0) {
        return null;
    }

    for (const rango of rangosPrecios) {
        if (cantidadCopias >= rango.min && cantidadCopias <= rango.max) {
            return rango.precio;
        }
    }

    return null;
}

function calcularPrecioTotal(cantidadCopias: number, precioPorCopia: number): number {
    return cantidadCopias * precioPorCopia;
}

function mostrarResultados(cantidadCopias: number, precioPorCopia: number, precioTotal: number): void {
    console.log(`\nResumen de la cotización:`);
    console.log(`- Cantidad de copias: ${cantidadCopias}`);
    console.log(`- Precio por copia: $${precioPorCopia}`);
    console.log(`- Precio total: $${precioTotal}\n`);
}

function calcularCostoCopias(cantidadCopias: number): void {
    const precioPorCopia = calcularPrecioPorCopia(cantidadCopias);
    
    if (precioPorCopia === null) {
        console.log("Error: Cantidad de copias no válida. Ingrese un número positivo.");
        return;
    }
    
    const precioTotal = calcularPrecioTotal(cantidadCopias, precioPorCopia);
    mostrarResultados(cantidadCopias, precioPorCopia, precioTotal);
}

async function obtenerCantidadCopias(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('Ingrese la cantidad de copias a imprimir: ', (input) => {
            const cantidad = parseInt(input);
            resolve(isNaN(cantidad) ? -1 : cantidad);
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log('Sistema de cálculo de costo de copias\n');
        
        const cantidadCopias = await obtenerCantidadCopias();
        calcularCostoCopias(cantidadCopias);
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
    }
}

main();
