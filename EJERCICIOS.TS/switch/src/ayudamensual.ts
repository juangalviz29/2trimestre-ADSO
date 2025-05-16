import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese su género: ", (genero: string) => {
    genero = genero.toLowerCase();

    rl.question("Ingrese su edad: ", (edadInput: string) => {
        let edad: number = parseInt(edadInput);

        let ayuda: number = 0;

        switch (genero) {
            case "femenino":
                if (edad > 50) {
                    ayuda = 120000;
                } else if (edad >= 30 && edad <= 50) {
                    ayuda = 100000;
                } else {
                    ayuda = 0;
                }
                break;
            case "masculino":
                if (edad > 50) {
                    ayuda = 120000;
                } else if (edad >= 30 && edad <= 50) {
                    ayuda = 100000;
                } else {
                    ayuda = 40000;
                }
                break;
            default:
                console.log("Género no válido.");
                rl.close();
                return;
        }

        console.log(`El valor de ayuda mensual es: $${ayuda}`);
        rl.close();
    });
});
