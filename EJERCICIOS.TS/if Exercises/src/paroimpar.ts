import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function verificarParImpar() {
    try {
    
        const input = await new Promise<string>(resolve => {
            rl.question('Ingrese un número para verificar si es par o impar: ', resolve);
        });

        const numero = parseFloat(input);

        if (isNaN(numero)) {
            console.log("Error: Por favor ingrese un número válido.");
            return;
        }

        if (!Number.isInteger(numero)) {
            console.log(`El número ${numero} es decimal. Solo se evaluará su parte entera (${Math.floor(numero)}).`);
        }

        const numeroEntero = Math.floor(numero);
        if (numeroEntero % 2 === 0) {
            console.log(`${numeroEntero} es un número par`);
        } else {
            console.log(`${numeroEntero} es un número impar`);
        }

    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

verificarParImpar();