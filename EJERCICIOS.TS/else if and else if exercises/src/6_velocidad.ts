import * as readline from 'readline';

enum EstadoDispositivo {
    PRENDIDO = "prendido",
    APAGADO = "apagado",
    BAJO = "bajo",
    CARGADO = "cargado"
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese el estado del dispositivo (prendido/apagado/bajo/cargado): ', (input) => {
    const estado = input.toLowerCase().trim() as EstadoDispositivo;
    
    if (Object.values(EstadoDispositivo).includes(estado)) {
        const mensajes = {
            [EstadoDispositivo.PRENDIDO]: "puede usarlo",
            [EstadoDispositivo.APAGADO]: "debe prenderlo",
            [EstadoDispositivo.BAJO]: "por favor cargue la batería",
            [EstadoDispositivo.CARGADO]: "puede desconectar su dispositivo"
        };
        
        console.log(`El dispositivo está ${estado}, ${mensajes[estado]}.`);
    } else {
        console.log(`Estado "${input}" no reconocido, verifique el dispositivo.`);
    }
    
    rl.close();
});