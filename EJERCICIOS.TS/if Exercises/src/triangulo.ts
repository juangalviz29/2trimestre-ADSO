import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function validarTriangulo() {
    try {
        console.log("Validador de triángulos\n");
        console.log("Ingrese los tres ángulos del triángulo:");

        const angulo1 = await obtenerAngulo("Primer ángulo: ");
        const angulo2 = await obtenerAngulo("Segundo ángulo: ");
        const angulo3 = await obtenerAngulo("Tercer ángulo: ");

        const sumaAngulos = angulo1

        if (sumaAngulos === 180) {
            console.log("\n✅ El triángulo es válido.");
            
            if (angulo1 === 60 && angulo2 === 60 && angulo3 === 60) {
                console.log("Tipo: Triángulo equilátero (todos los ángulos iguales)");
            } else if (angulo1 === 90 || angulo2 === 90 || angulo3 === 90) {
                console.log("Tipo: Triángulo rectángulo (tiene un ángulo de 90°)");
            } else if (angulo1 > 90 || angulo2 > 90 || angulo3 > 90) {
                console.log("Tipo: Triángulo obtusángulo (tiene un ángulo mayor a 90°)");
            } else {
                console.log("Tipo: Triángulo acutángulo (todos los ángulos menores a 90°)");
            }
        } else {
            console.log(`\n❌ El triángulo no es válido. La suma de ángulos es ${sumaAngulos}° (debe ser 180°).`);
        }

    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

async function obtenerAngulo(prompt: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => {
            const angulo = parseFloat(input);
            if (isNaN(angulo)) {
                console.log("Por favor ingrese un número válido.");
                obtenerAngulo(prompt).then(resolve);
            } else if (angulo <= 0) {
                console.log("El ángulo debe ser mayor a 0°.");
                obtenerAngulo(prompt).then(resolve);
            } else {
                resolve(angulo);
            }
        });
    });
}

validarTriangulo();
