import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese el número de modelo del automóvil: ', (input) => {
    const numeroModelo: number = parseInt(input);
    
    if (numeroModelo === 119 || 
        numeroModelo === 179 || 
        (numeroModelo >= 189 && numeroModelo <= 195) || 
        numeroModelo === 221 || 
        numeroModelo === 780) {
        console.log("El automóvil está defectuoso, llevar a garantía.");
    } else {
        console.log("Su automóvil no está defectuoso.");
    }
    
    rl.close();
});