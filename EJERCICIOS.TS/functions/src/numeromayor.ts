import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function encontrarNumeroMayor(num1: number, num2: number, num3: number): number | null {
    if (num1 > num2 && num1 > num3) {
        return num1;
    } else if (num2 > num1 && num2 > num3) {
        return num2;
    } else if (num3 > num1 && num3 > num2) {
        return num3;
    } else {
        return null;
    }
}

function mostrarResultado(num1: number, num2: number, num3: number): void {
    const numeroMayor = encontrarNumeroMayor(num1, num2, num3);

    if (numeroMayor === null) {
        console.log("Los números son iguales o hay un empate.");
    } else {
        console.log(`El número mayor entre ${num1}, ${num2} y ${num3} es: ${numeroMayor}`);
    }
}

function compararNumeros(num1: number, num2: number, num3: number): void {
    mostrarResultado(num1, num2, num3);
}

async function obtenerNumero(prompt: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => {
            const num = parseFloat(input);
            resolve(isNaN(num) ? NaN : num);
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Comparador de números\n");

        const num1 = await obtenerNumero("Ingrese el primer número: ");
        const num2 = await obtenerNumero("Ingrese el segundo número: ");
        const num3 = await obtenerNumero("Ingrese el tercer número: ");

        if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
            console.log("Error: Todos los valores deben ser números válidos.");
        } else {
            compararNumeros(num1, num2, num3);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();