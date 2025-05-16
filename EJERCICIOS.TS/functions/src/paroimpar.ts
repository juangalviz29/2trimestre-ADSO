import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function esPar(numero: number): boolean {
    return numero % 2 === 0;
}

function mostrarResultado(numero: number): void {
    if (esPar(numero)) {
        console.log(`${numero} es un número par`);
    } else {
        console.log(`${numero} es un número impar`);
    }
}

function verificarParidad(numero: number): void {
    mostrarResultado(numero);
}

async function obtenerNumero(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('Ingrese un número para verificar si es par o impar: ', (input) => {
            const num = parseInt(input);
            resolve(isNaN(num) ? NaN : num);
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Verificador de paridad de números\n");
        
        const numero = await obtenerNumero();
        
        if (isNaN(numero)) {
            console.log("Error: Debe ingresar un número válido");
        } else {
            verificarParidad(numero);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();