import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese su nombre: ', (nombreUsuario) => {
    rl.question('¿Tiene membresía activa? (si/no): ', (respuestaMembresia) => {
        const membresiaActiva: boolean = respuestaMembresia.toLowerCase() === 'si';
        
        if (nombreUsuario.toLowerCase() === "juan pablo" && membresiaActiva) {
            console.log(`Hola ${nombreUsuario}, bienvenido al gimnasio. ¡Listo para entrenar!`);
        } else {
            console.log(`Lo sentimos, ${nombreUsuario}. Necesitas una membresía activa para acceder al gimnasio.`);
        }
        
        rl.close();
    });
});