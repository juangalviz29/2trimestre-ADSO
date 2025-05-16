import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese el tipo de reserva (individual/grupo/especial): ', (tipoReserva) => {

    const tipo = tipoReserva.toLowerCase().trim();

    if (tipo === "individual") {
        console.log("Su mesa está lista en la zona tranquila, por ser reserva individual");
    } 
    else if (tipo === "grupo") {
        console.log("Se le ha asignado una mesa en la zona de grupos para su atención.");
    }
    else if (tipo === "especial") {
        console.log("Su mesa está reservada en la zona VIP, disfrute de su experiencia.");
    }
    else {
        console.log("No se encontró su reserva, por favor diríjase a la recepción.");
    }

    rl.close();
});