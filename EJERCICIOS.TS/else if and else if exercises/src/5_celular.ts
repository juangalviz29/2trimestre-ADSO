import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese el estado del dispositivo (prendido/apagado/bajo/cargado): ', (estadoDispositivo) => {
 
    const estado = estadoDispositivo.toLowerCase().trim();
    
    if (estado === "prendido") {
        console.log(`El dispositivo está ${estado}, puede usarlo.`);
    } 
    else if (estado === "apagado") {
        console.log(`El dispositivo está ${estado}, debe prenderlo.`);
    }
    else if (estado === "bajo") {
        console.log(`El dispositivo está ${estado}, por favor cargue la batería.`);
    }
    else if (estado === "cargado") {
        console.log(`El dispositivo está ${estado}, puede desconectar su dispositivo.`);
    }
    else {
        console.log(`Estado "${estadoDispositivo}" no reconocido, verifique el dispositivo.`);
    }
    
    rl.close();
});