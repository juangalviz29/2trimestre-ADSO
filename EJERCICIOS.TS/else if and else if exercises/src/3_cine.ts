import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('¿Está ocupada la sala? (si/no): ', (respuestaOcupacion) => {
    const ocupacionSala: boolean = respuestaOcupacion.toLowerCase() === 'si';
    
    rl.question('Ingrese el número de sala: ', (numeroSala) => {
        let mensaje: string;
        
        if (ocupacionSala) {
            mensaje = `La sala número ${numeroSala} está ocupada`;
        } else {
            mensaje = `La sala número ${numeroSala} está disponible`;
        }
        
        console.log(mensaje);
        rl.close();
    });
});