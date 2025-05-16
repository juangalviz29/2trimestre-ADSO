import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Tipo para nuestros proyectos
type Proyecto = Map<string, string | number>;

// Datos iniciales
const proyectos: Proyecto[] = [
    new Map<string, string | number>([["nombre", "Proyecto A"], ["presupuesto", 5000]]),
    new Map<string, string | number>([["nombre", "Proyecto B"], ["presupuesto", 8000]])
];

// Función principal del menú
const mostrarMenu = async (): Promise<void> => {
    console.log('\n=== Gestión de Proyectos ===');
    console.log('1. Mostrar todos los proyectos');
    console.log('2. Agregar nuevo proyecto');
    console.log('3. Buscar proyecto por nombre');
    console.log('4. Actualizar presupuesto');
    console.log('5. Eliminar proyecto');
    console.log('6. Mostrar estadísticas');
    console.log('7. Salir');

    const opcion = await preguntar('Seleccione una opción: ');

    switch (opcion) {
        case '1':
            mostrarProyectos();
            break;
        case '2':
            await agregarProyecto();
            break;
        case '3':
            await buscarProyecto();
            break;
        case '4':
            await actualizarPresupuesto();
            break;
        case '5':
            await eliminarProyecto();
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

// Función auxiliar para preguntas
const preguntar = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

// Función para mostrar todos los proyectos
const mostrarProyectos = (): void => {
    console.log('\nListado de Proyectos:');
    if (proyectos.length === 0) {
        console.log('No hay proyectos registrados.');
    } else {
        proyectos.forEach((proyecto, index) => {
            const nombre = proyecto.get('nombre');
            const presupuesto = proyecto.get('presupuesto');
            console.log(`${index + 1}. ${nombre} - Presupuesto: $${presupuesto}`);
        });
    }
};

// Función para agregar un nuevo proyecto
const agregarProyecto = async (): Promise<void> => {
    console.log('\nAgregar nuevo proyecto:');
    
    const nombre = await preguntar('Nombre del proyecto: ');
    const presupuesto = await preguntar('Presupuesto: ');
    
    const presupuestoNum = parseFloat(presupuesto);
    if (isNaN(presupuestoNum)) {
        console.log('El presupuesto debe ser un número válido.');
        return;
    }
    
    const nuevoProyecto: Proyecto = new Map<string, string | number>([
        ['nombre', nombre],
        ['presupuesto', presupuestoNum]
    ]);
    
    proyectos.push(nuevoProyecto);
    console.log(`Proyecto "${nombre}" agregado correctamente.`);
};

// Función para buscar proyecto por nombre
const buscarProyecto = async (): Promise<void> => {
    const nombreBusqueda = await preguntar('Ingrese el nombre del proyecto a buscar: ');
    
    const proyectoEncontrado = proyectos.find(proyecto => 
        proyecto.get('nombre')?.toString().toLowerCase() === nombreBusqueda.toLowerCase()
    );
    
    if (proyectoEncontrado) {
        console.log('\nProyecto encontrado:');
        console.log(`Nombre: ${proyectoEncontrado.get('nombre')}`);
        console.log(`Presupuesto: $${proyectoEncontrado.get('presupuesto')}`);
    } else {
        console.log(`No se encontró ningún proyecto con el nombre "${nombreBusqueda}".`);
    }
};

// Función para actualizar presupuesto
const actualizarPresupuesto = async (): Promise<void> => {
    mostrarProyectos();
    if (proyectos.length === 0) return;
    
    const indiceStr = await preguntar('Seleccione el número del proyecto a actualizar: ');
    const indice = parseInt(indiceStr) - 1;
    
    if (isNaN(indice) || indice < 0 || indice >= proyectos.length) {
        console.log('Número de proyecto inválido.');
        return;
    }
    
    const nuevoPresupuestoStr = await preguntar('Nuevo presupuesto: ');
    const nuevoPresupuesto = parseFloat(nuevoPresupuestoStr);
    
    if (isNaN(nuevoPresupuesto)) {
        console.log('El presupuesto debe ser un número válido.');
        return;
    }
    
    const proyecto = proyectos[indice];
    proyecto.set('presupuesto', nuevoPresupuesto);
    console.log(`Presupuesto del proyecto "${proyecto.get('nombre')}" actualizado a $${nuevoPresupuesto}.`);
};

// Función para eliminar proyecto
const eliminarProyecto = async (): Promise<void> => {
    mostrarProyectos();
    if (proyectos.length === 0) return;
    
    const indiceStr = await preguntar('Seleccione el número del proyecto a eliminar: ');
    const indice = parseInt(indiceStr) - 1;
    
    if (isNaN(indice) || indice < 0 || indice >= proyectos.length) {
        console.log('Número de proyecto inválido.');
        return;
    }
    
    const [proyectoEliminado] = proyectos.splice(indice, 1);
    console.log(`Proyecto "${proyectoEliminado.get('nombre')}" eliminado correctamente.`);
};

// Función para mostrar estadísticas
const mostrarEstadisticas = (): void => {
    if (proyectos.length === 0) {
        console.log('No hay proyectos para calcular estadísticas.');
        return;
    }

    const presupuestos = proyectos.map(p => Number(p.get('presupuesto')));
    const total = presupuestos.reduce((sum, actual) => sum + actual, 0);
    const promedio = total / proyectos.length;
    const maximo = Math.max(...presupuestos);
    const minimo = Math.min(...presupuestos);

    console.log('\nEstadísticas de Proyectos:');
    console.log(`Total de proyectos: ${proyectos.length}`);
    console.log(`Presupuesto total: $${total}`);
    console.log(`Presupuesto promedio: $${promedio.toFixed(2)}`);
    console.log(`Presupuesto máximo: $${maximo} (${proyectos.find(p => Number(p.get('presupuesto')) === maximo)?.get('nombre')})`);
    console.log(`Presupuesto mínimo: $${minimo} (${proyectos.find(p => Number(p.get('presupuesto')) === minimo)?.get('nombre')})`);
};

// Manejar el cierre
rl.on('close', () => {
    console.log('\n=== Resumen Final ===');
    mostrarProyectos();
    console.log('Aplicación terminada.');
    process.exit(0);
});

// Iniciar la aplicación
console.log('=== Sistema de Gestión de Proyectos ===');
mostrarMenu().catch(err => {
    console.error('Error:', err);
    rl.close();
});