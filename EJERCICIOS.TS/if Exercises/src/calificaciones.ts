import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function obtenerCalificacion(materia: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(`Ingresa la calificación de ${materia} (0-10): `, (input) => {
            const calificacion = parseFloat(input);
            if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
                console.log('Por favor ingresa un número válido entre 0 y 10');
                obtenerCalificacion(materia).then(resolve);
            } else {
                resolve(calificacion);
            }
        });
    });
}

async function main() {
    try {
        console.log('Calculadora de calificaciones\n');
        
        const fisica = await obtenerCalificacion('Física');
        const quimica = await obtenerCalificacion('Química');
        const biologia = await obtenerCalificacion('Biología');
        const matematicas = await obtenerCalificacion('Matemáticas');
        const informatica = await obtenerCalificacion('Informática');

        const sumaCalificaciones = fisica + quimica + biologia + matematicas + informatica;
        const porcentajeFinal = (sumaCalificaciones / 50) * 100;

        let calificacionCualitativa: string;
        if (porcentajeFinal < 60) {
            calificacionCualitativa = "Mala";
        } else if (porcentajeFinal >= 60 && porcentajeFinal < 80) {
            calificacionCualitativa = "Buena";
        } else {
            calificacionCualitativa = "Excelente";
        }

        console.log(`\nResultados:`);
        console.log(`- Suma total: ${sumaCalificaciones}/50`);
        console.log(`- Porcentaje: ${porcentajeFinal.toFixed(2)}%`);
        console.log(`- Calificación: ${calificacionCualitativa}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

main();