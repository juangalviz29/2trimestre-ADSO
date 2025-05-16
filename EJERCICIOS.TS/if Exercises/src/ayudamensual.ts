import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularAyuda(genero: string, edad: number): number {
    genero = genero.toLowerCase();
    
    if (genero === "femenino") {
        if (edad > 50) return 120000;
        if (edad >= 30) return 100000;
        return 0;
    } else if (genero === "masculino") {
        if (edad > 50) return 120000;
        if (edad >= 30) return 100000;
        return 40000;
    }
    
    throw new Error("Género no válido");
}

function main() {
    rl.question('Ingrese el género (femenino/masculino): ', (genero) => {
        rl.question('Ingrese la edad: ', (edadInput) => {
            try {
                const edad = parseInt(edadInput);
                if (isNaN(edad)) throw new Error("La edad debe ser un número");
                if (edad < 0) throw new Error("La edad no puede ser negativa");
                
                const ayuda = calcularAyuda(genero, edad);
                console.log(`El valor de ayuda mensual es: $${ayuda}`);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("Ocurrió un error desconocido");
                }
            } finally {
                rl.close();
            }
        });
    });
}

main();