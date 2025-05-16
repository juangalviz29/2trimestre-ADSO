import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const LIMITE_VELOCIDAD = 60;

rl.question('Ingrese su velocidad actual (km/h): ', (inputVelocidad) => {
    const velocidad = parseInt(inputVelocidad);
    
    if (isNaN(velocidad)) {
        console.log('Error: Por favor ingrese un número válido');
    } else {
        if (velocidad > LIMITE_VELOCIDAD) {
            console.log(`Usted está excediendo el límite de velocidad, su velocidad es de ${velocidad} km/h.`);
        } else {
            console.log('Su velocidad está dentro del límite permitido.');
        }
    }
    
    rl.close();
});