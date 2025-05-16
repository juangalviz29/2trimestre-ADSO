import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Por favor ingresa tu edad: ', (answer) => {
    const edad: number = parseInt(answer);
    
    if (isNaN(edad)) {
        console.log('Por favor ingresa un número válido.');
    } 
    else if (edad >= 18) {
        console.log("Es mayor de edad.");
    } 
    else {
        console.log("Es menor de edad.");
    }
    
    rl.close();
});