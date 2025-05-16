import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function encontrarNumeroMayor() {
    try {
        
        const num1 = await obtenerNumero("Ingrese el primer número: ");
        const num2 = await obtenerNumero("Ingrese el segundo número: ");
        const num3 = await obtenerNumero("Ingrese el tercer número: ");

        if (num1 > num2 && num1 > num3) {
            console.log(`\nEl número mayor es: ${num1}`);
        } else if (num2 > num1 && num2 > num3) {
            console.log(`\nEl número mayor es: ${num2}`);
        } else if (num3 > num1 && num3 > num2) {
            console.log(`\nEl número mayor es: ${num3}`);
        } else {
            console.log("\nLos números son iguales o hay un empate.");
        }

        console.log(`\nNúmeros ingresados: ${num1}, ${num2}, ${num3}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

async function obtenerNumero(prompt: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => {
            const numero = parseFloat(input);
            resolve(isNaN(numero) ? 0 : numero);
        });
    });
}

encontrarNumeroMayor();