import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingresa la calificación de Física (0-10): ", (fisicaInput: string) => {
    let fisica: number = parseFloat(fisicaInput);

    rl.question("Ingresa la calificación de Química (0-10): ", (quimicaInput: string) => {
        let quimica: number = parseFloat(quimicaInput);

        rl.question("Ingresa la calificación de Biología (0-10): ", (biologiaInput: string) => {
            let biologia: number = parseFloat(biologiaInput);

            rl.question("Ingresa la calificación de Matemáticas (0-10): ", (matematicasInput: string) => {
                let matematicas: number = parseFloat(matematicasInput);

                rl.question("Ingresa la calificación de Informática (0-10): ", (informaticaInput: string) => {
                    let informatica: number = parseFloat(informaticaInput);

                    // Validar que todas las calificaciones estén en el rango correcto
                    const calificaciones: number[] = [fisica, quimica, biologia, matematicas, informatica];
                    const invalida = calificaciones.some(cal => cal < 0 || cal > 10 || isNaN(cal));

                    if (invalida) {
                        console.log("Error: Las calificaciones deben estar entre 0 y 10.");
                        rl.close();
                        return;
                    }

                    const sumaCalificaciones: number = calificaciones.reduce((a, b) => a + b, 0);
                    const porcentajeFinal: number = (sumaCalificaciones / 50) * 100;

                    let calificacionCualitativa: string;

                    switch (true) {
                        case (porcentajeFinal < 60):
                            calificacionCualitativa = "Mala";
                            break;
                        case (porcentajeFinal >= 60 && porcentajeFinal < 80):
                            calificacionCualitativa = "Buena";
                            break;
                        default:
                            calificacionCualitativa = "Excelente";
                            break;
                    }

                    console.log(`Tu porcentaje es ${porcentajeFinal}% y tu calificación es ${calificacionCualitativa}.`);
                    rl.close();
                });
            });
        });
    });
});
