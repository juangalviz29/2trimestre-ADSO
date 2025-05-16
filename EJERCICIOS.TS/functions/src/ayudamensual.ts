import * as readline from 'readline';

type Genero = 'femenino' | 'masculino';

function calcularAyudaFemenino(edad: number): number {
    if (edad > 50) {
        return 120000;
    } else if (edad >= 30 && edad <= 50) {
        return 100000;
    } else {
        return 0;
    }
}

function calcularAyudaMasculino(edad: number): number {
    if (edad > 50) {
        return 120000;
    } else if (edad >= 30 && edad <= 50) {
        return 100000;
    } else {
        return 40000;
    }
}

function obtenerAyuda(genero: Genero, edad: number): number {
    if (genero === "femenino") {
        return calcularAyudaFemenino(edad);
    } else if (genero === "masculino") {
        return calcularAyudaMasculino(edad);
    } else {
        console.log("Género no válido.");
        return 0;
    }
}

function mostrarAyuda(genero: Genero, edad: number): void {
    const ayuda = obtenerAyuda(genero, edad);
    console.log(`El valor de ayuda mensual es: $${ayuda}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main(): void {
    rl.question('Ingrese el género (femenino/masculino): ', (generoInput) => {
        const genero = generoInput.toLowerCase() as Genero;
        
        if (genero !== 'femenino' && genero !== 'masculino') {
            console.log('Género no válido. Debe ser "femenino" o "masculino".');
            rl.close();
            return;
        }

        rl.question('Ingrese la edad: ', (edadInput) => {
            const edad = parseInt(edadInput);
            
            if (isNaN(edad)) {
                console.log('Edad no válida. Debe ser un número.');
            } else {
                mostrarAyuda(genero, edad);
            }
            
            rl.close();
        });
    });
}

main();