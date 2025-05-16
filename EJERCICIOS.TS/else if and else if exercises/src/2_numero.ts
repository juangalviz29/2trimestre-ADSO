import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Por favor ingresa un número: ', (answer) => {
    const numero: number = parseFloat(answer);
    
    if (isNaN(numero)) {
        console.log('Error: Debes ingresar un número válido');
    } else {
        if (numero > 0) {
            console.log("Número positivo");
        } else if (numero < 0) {
            console.log("Número negativo");
        } else {
            console.log("El número es cero");
        }
    }
    
    rl.close();
});