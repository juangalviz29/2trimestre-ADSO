import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

type DiaSemana = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';

rl.question('Ingrese el día de la semana: ', (diaInput) => {
    const dia = diaInput.toLowerCase().trim() as DiaSemana;
    
    rl.question('¿Cuál es su actividad planificada para el viernes? ', (actividadInput) => {
        const actividad = actividadInput.trim();

        if (dia === 'lunes') {
            console.log(`Hoy es ${dia}, ¡comienza la semana con energía!`);
        } 
        else if (dia === 'martes') {
            console.log(`Hoy es ${dia}, es un buen día para estudiar.`);
        }
        else if (dia === 'miércoles') {
            console.log(`Hoy es ${dia}, ¡la mitad de la semana!`);
        }
        else if (dia === 'jueves') {
            console.log(`Hoy es ${dia}, ¡casi el fin de semana!`);
        }
        else if (dia === 'viernes') {
            console.log(`Hoy es ${dia}, ¡es noche de ${actividad}!`);
        }
        else if (dia === 'sábado') {
            console.log(`Hoy es ${dia}, es un gran día para descansar.`);
        }
        else if (dia === 'domingo') {
            console.log(`Hoy es ${dia}, día de preparación para la semana.`);
        }
        else {
            console.log('Día inválido, por favor ingrese un día de la semana correcto.');
        }

        rl.close();
    });
});