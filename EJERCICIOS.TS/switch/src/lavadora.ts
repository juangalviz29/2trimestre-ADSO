import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese el tipo de lavadora: ", (tipoLavadoraInput: string) => {
    let tipoLavadora: number = parseInt(tipoLavadoraInput);

    rl.question("Ingrese la cantidad de lavadoras: ", (cantidadInput: string) => {
        let cantidad: number = parseInt(cantidadInput);

        rl.question("Ingrese la cantidad de horas: ", (horasInput: string) => {
            let horas: number = parseInt(horasInput);

            if (
                isNaN(tipoLavadora) || isNaN(cantidad) || isNaN(horas) ||
                tipoLavadora < 1 || tipoLavadora > 2 ||
                cantidad < 1 || horas < 1
            ) {
                console.log("Valores no válidos. Asegúrese de ingresar números válidos.");
                rl.close();
                return;
            }

            let costoTotal: number = 0;

            switch (tipoLavadora) {
                case 1:
                    costoTotal = cantidad * horas * 4000;
                    break;
                case 2:
                    costoTotal = cantidad * horas * 3000;
                    break;
                default:
                    console.log("Tipo de lavadora no válido. Debe ser 1 o 2.");
                    rl.close();
                    return;
            }

            if (cantidad > 3) {
                costoTotal *= 0.97; // Aplicar descuento del 3%
            }

            console.log(`Costo total por alquilar ${cantidad} lavadoras tipo ${tipoLavadora} por ${horas} horas: $${costoTotal}.`);
            rl.close();
        });
    });
});
