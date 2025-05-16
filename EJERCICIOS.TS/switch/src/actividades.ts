import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese el día de la semana: ", (dia: string) => {
    dia = dia.toLowerCase(); 

    switch (dia) {
        case "lunes":
            console.log("Hoy es lunes, ¡comienza la semana con energía!");
            rl.close();
            break;
        case "martes":
            console.log("Hoy es martes, es un buen día para estudiar.");
            rl.close();
            break;
        case "miercoles": 
            console.log("Hoy es miércoles, es mitad de semana!");
            rl.close();
            break;
        case "jueves":
            console.log("Hoy es jueves, ¡casi es fin de semana!");
            rl.close();
            break;
        case "viernes":
            rl.question("¿Qué vas hacer el viernes? ", (actividad: string) => {
                console.log(`Hoy es viernes, ¡es noche de ${actividad}!`);
                rl.close();
            });
            break;
        case "sabado": 
            console.log("Hoy es sábado, es un gran día para descansar.");
            rl.close();
            break;
        case "domingo":
            console.log("Hoy es domingo, día de preparación para la semana.");
            rl.close();
            break;
        default:
            console.log("Día inválido, por favor ingrese un día de la semana correcto.");
            rl.close();
            break;
    }
});
