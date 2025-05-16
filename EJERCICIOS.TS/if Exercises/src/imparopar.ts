import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function verificarParImpar() {
    try {
 
        const input = await new Promise<string>((resolve) => {
            rl.question('Ingrese un número para verificar si es par o impar: ', resolve);
        });

        const numero = parseFloat(input);

        if (isNaN(numero)) {
            console.log("¡Error! No ingresaste un número válido.");
        } else if (numero % 2 === 0) {
            console.log(`El número ${numero} es par.`);
        } else {
            console.log(`El número ${numero} es impar.`);
        }

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

verificarParImpar();