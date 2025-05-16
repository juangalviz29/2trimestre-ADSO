import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function esNumeroValido(valor: any): boolean {
    return !isNaN(Number(valor));
}

function esPar(numero: number): boolean {
    return numero % 2 === 0;
}

function mostrarResultado(numero: number | string): void {
    const num = Number(numero);
    
    if (!esNumeroValido(numero)) {
        console.log("¡Error! No ingresaste un número válido.");
    } else if (esPar(num)) {
        console.log(`El número ${num} es par.`);
    } else {
        console.log(`El número ${num} es impar.`);
    }
}

function evaluarNumero(numero: number | string): void {
    mostrarResultado(numero);
}

async function obtenerNumero(): Promise<string> {
    return new Promise((resolve) => {
        rl.question('Ingrese un número para evaluar si es par o impar: ', (input) => {
            resolve(input);
        });
    });
}

async function main(): Promise<void> {
    try {
        const input = await obtenerNumero();
        evaluarNumero(input);
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
    }
}

main();