import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const TARIFA_1 = 30000;
const TARIFA_2 = 33000;

function calcularSalario(horas: number): number {
    if (horas >= 1 && horas <= 10) {
        return horas * TARIFA_1;
    } else if (horas > 10) {
        return horas * TARIFA_2;
    } else {
        return 0;
    }
}

function mostrarResultado(nombre: string, horas: number, salario: number): void {
    console.log(`\nSeñor/a ${nombre}, el número de horas trabajadas es ${horas} y su salario equivale a $${salario.toLocaleString()}.\n`);
}

function calcularYMostrarSalario(nombre: string, horas: number): void {
    const salario = calcularSalario(horas);
    mostrarResultado(nombre, horas, salario);
}

async function obtenerEntrada(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pregunta, (input) => {
            resolve(input.trim());
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Sistema de cálculo de salario\n");

        const nombre = await obtenerEntrada("Ingrese su nombre: ");
        const horasInput = await obtenerEntrada("Ingrese las horas trabajadas: ");
        const horas = parseFloat(horasInput);

        if (isNaN(horas) || horas < 0) {
            console.log("Error: Las horas trabajadas deben ser un número positivo");
        } else {
            calcularYMostrarSalario(nombre, horas);
        }
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

main();