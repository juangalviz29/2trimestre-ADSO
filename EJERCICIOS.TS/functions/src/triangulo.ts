import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularSumaAngulos(angulo1: number, angulo2: number, angulo3: number): number {
    return angulo1 + angulo2 + angulo3;
}

function esTrianguloValido(sumaAngulos: number): boolean {
    return sumaAngulos === 180;
}

function mostrarResultado(esValido: boolean): void {
    if (esValido) {
        console.log("✅ El triángulo es válido (suma exactamente 180°).");
    } else {
        console.log("❌ El triángulo no es válido (no suma 180°).");
    }
}

function verificarTriangulo(angulo1: number, angulo2: number, angulo3: number): void {
    const sumaAngulos = calcularSumaAngulos(angulo1, angulo2, angulo3);
    const esValido = esTrianguloValido(sumaAngulos);
    mostrarResultado(esValido);
}

async function obtenerAngulo(numeroAngulo: number): Promise<number> {
    return new Promise((resolve) => {
        rl.question(`Ingrese el ángulo #${numeroAngulo} (en grados): `, (input) => {
            const angulo = parseFloat(input);
            resolve(isNaN(angulo) ? NaN : angulo);
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Validador de triángulos\n");
        
        const angulo1 = await obtenerAngulo(1);
        const angulo2 = await obtenerAngulo(2);
        const angulo3 = await obtenerAngulo(3);

        if (isNaN(angulo1) || isNaN(angulo2) || isNaN(angulo3)) {
            console.log("Error: Todos los ángulos deben ser números válidos.");
        } else if (angulo1 <= 0 || angulo2 <= 0 || angulo3 <= 0) {
            console.log("Error: Los ángulos deben ser mayores que 0°.");
        } else {
            verificarTriangulo(angulo1, angulo2, angulo3);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();