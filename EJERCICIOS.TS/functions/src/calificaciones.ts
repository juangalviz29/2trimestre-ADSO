import * as readline from 'readline';

type CalificacionCualitativa = "Mala" | "Buena" | "Excelente";

function calcularSumaCalificaciones(calificaciones: number[]): number {
    return calificaciones.reduce((suma, calificacion) => suma + calificacion, 0);
}

function calcularPorcentajeFinal(sumaCalificaciones: number, totalCalificaciones: number): number {
    return (sumaCalificaciones / totalCalificaciones) * 100;
}

function determinarCalificacionCualitativa(porcentajeFinal: number): CalificacionCualitativa {
    if (porcentajeFinal < 60) {
        return "Mala";
    } else if (porcentajeFinal >= 60 && porcentajeFinal < 80) {
        return "Buena";
    } else {
        return "Excelente";
    }
}

function evaluarCalificaciones(calificaciones: number[], totalCalificaciones: number): void {
    const sumaCalificaciones = calcularSumaCalificaciones(calificaciones);
    const porcentajeFinal = calcularPorcentajeFinal(sumaCalificaciones, totalCalificaciones);
    const calificacionCualitativa = determinarCalificacionCualitativa(porcentajeFinal);

    console.log(`Tu porcentaje es ${porcentajeFinal.toFixed(2)}% y tu calificación es ${calificacionCualitativa}.`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function obtenerCalificaciones(): Promise<number[]> {
    return new Promise((resolve) => {
        rl.question('Ingrese las calificaciones separadas por comas (ej. 10,8,9,7): ', (input) => {
            const calificaciones = input.split(',')
                                      .map(item => parseFloat(item.trim()))
                                      .filter(item => !isNaN(item));
            resolve(calificaciones);
        });
    });
}

function obtenerTotalCalificaciones(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('Ingrese el total de calificaciones posibles (ej. 50): ', (input) => {
            const total = parseFloat(input);
            resolve(isNaN(total) ? 0 : total);
        });
    });
}

async function main(): Promise<void> {
    try {
        const calificaciones = await obtenerCalificaciones();
        const totalCalificaciones = await obtenerTotalCalificaciones();

        if (calificaciones.length === 0) {
            console.log('No se ingresaron calificaciones válidas.');
        } else if (totalCalificaciones <= 0) {
            console.log('El total de calificaciones debe ser mayor que cero.');
        } else {
            evaluarCalificaciones(calificaciones, totalCalificaciones);
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
    }
}

main();