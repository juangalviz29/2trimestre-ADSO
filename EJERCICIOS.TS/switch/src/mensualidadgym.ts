import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese la duración (15 dias, 30 dias, 3 meses): ', (duracion: string) => {
    let costo: number = 0;

    switch (duracion.toLowerCase()) {
        case "15 dias":
            costo = 18000;
            break;
        case "30 dias":
            costo = 35000;
            break;
        case "3 meses":
            costo = 86000;
            break;
        default:
            console.log("Duración no válida.");
            rl.close();
            return;
    }

    console.log(`El costo de la mensualidad es: $${costo.toLocaleString()}`);

    rl.close();
});
