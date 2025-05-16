import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const puntajesIniciales: number[] = [85, 92, 78, 95, 88];
const mapaPuntajes: Map<number, number> = new Map(
    puntajesIniciales.map((puntaje, indice) => [indice, puntaje])
);

const mostrarMenu = async (): Promise<void> => {
    console.log('\n=== Gestión de Puntajes ===');
    console.log('1. Mostrar todos los puntajes');
    console.log('2. Agregar nuevo puntaje');
    console.log('3. Buscar puntaje por índice');
    console.log('4. Actualizar puntaje');
    console.log('5. Eliminar puntaje');
    console.log('6. Mostrar estadísticas');
    console.log('7. Salir');

    const opcion = await preguntar('Seleccione una opción: ');

    switch (opcion) {
        case '1':
            mostrarTodos();
            break;
        case '2':
            await agregarPuntaje();
            break;
        case '3':
            await buscarPuntaje();
            break;
        case '4':
            await actualizarPuntaje();
            break;
        case '5':
            await eliminarPuntaje();
            break;
        case '6':
            mostrarEstadisticas();
            break;
        case '7':
            rl.close();
            return;
        default:
            console.log('Opción no válida. Intente nuevamente.');
    }

    await mostrarMenu();
};

const preguntar = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const obtenerNumero = async (mensaje: string): Promise<number> => {
    while (true) {
        const input = await preguntar(mensaje);
        const numero = parseFloat(input);
        
        if (!isNaN(numero)) {
            return numero;
        }
        
        console.log('Por favor ingrese un número válido.');
    }
};

const mostrarTodos = (): void => {
    console.log('\nTodos los puntajes:');
    if (mapaPuntajes.size === 0) {
        console.log('No hay puntajes registrados.');
    } else {
        mapaPuntajes.forEach((puntaje, indice) => {
            console.log(`Índice ${indice}: ${puntaje}`);
        });
    }
};

const agregarPuntaje = async (): Promise<void> => {
    const indice = mapaPuntajes.size;
    const puntaje = await obtenerNumero('Ingrese el nuevo puntaje: ');
    
    mapaPuntajes.set(indice, puntaje);
    console.log(`Puntaje ${puntaje} agregado con índice ${indice}.`);
};

const buscarPuntaje = async (): Promise<void> => {
    const indice = await obtenerNumero('Ingrese el índice a buscar: ');
    
    if (mapaPuntajes.has(indice)) {
        console.log(`Puntaje en índice ${indice}: ${mapaPuntajes.get(indice)}`);
    } else {
        console.log(`No existe puntaje con índice ${indice}.`);
    }
};

const actualizarPuntaje = async (): Promise<void> => {
    const indice = await obtenerNumero('Ingrese el índice a actualizar: ');
    
    if (mapaPuntajes.has(indice)) {
        const nuevoPuntaje = await obtenerNumero('Ingrese el nuevo valor: ');
        mapaPuntajes.set(indice, nuevoPuntaje);
        console.log(`Puntaje en índice ${indice} actualizado a ${nuevoPuntaje}.`);
    } else {
        console.log(`No existe puntaje con índice ${indice}.`);
    }
};

const eliminarPuntaje = async (): Promise<void> => {
    const indice = await obtenerNumero('Ingrese el índice a eliminar: ');
    
    if (mapaPuntajes.delete(indice)) {
        console.log(`Puntaje en índice ${indice} eliminado.`);
    } else {
        console.log(`No existe puntaje con índice ${indice}.`);
    }
};

const mostrarEstadisticas = (): void => {
    if (mapaPuntajes.size === 0) {
        console.log('No hay puntajes para calcular estadísticas.');
        return;
    }

    const puntajes = Array.from(mapaPuntajes.values());
    const maximo = Math.max(...puntajes);
    const minimo = Math.min(...puntajes);
    const promedio = puntajes.reduce((a, b) => a + b, 0) / puntajes.length;

    console.log('\nEstadísticas:');
    console.log(`Total de puntajes: ${puntajes.length}`);
    console.log(`Puntaje máximo: ${maximo}`);
    console.log(`Puntaje mínimo: ${minimo}`);
    console.log(`Promedio: ${promedio.toFixed(2)}`);
};

rl.on('close', () => {
    console.log('\n=== Resumen Final ===');
    mostrarTodos();
    console.log('Aplicación terminada.');
    process.exit(0);
});

console.log('=== Sistema de Gestión de Puntajes ===');
console.log(`Puntajes iniciales: ${puntajesIniciales.join(', ')}`);
mostrarMenu().catch(err => {
    console.error('Error:', err);
    rl.close();
});