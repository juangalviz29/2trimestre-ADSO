import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pregunta(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (respuesta: string) => {
            resolve(respuesta);
        });
    });
}

let continuar = true;

(async () => {
    while (continuar) {
        const input = await pregunta('Ingrese un número (o escriba "salir" para terminar): ');

        if (input.toLowerCase() === 'salir') {
            continuar = false;
        } else {
            const numero = parseFloat(input);

            if (isNaN(numero)) {
                console.log("¡Error! No ingresaste un número válido.");
            } else if (numero > 0) {
                console.log("Número positivo.");
            } else if (numero < 0) {
                console.log("Número negativo.");
            } else {
                console.log("El número es cero.");
            }
        }
    }

    console.log("Gracias por usar el sistema. ¡Hasta luego!");
    rl.close();
})();
