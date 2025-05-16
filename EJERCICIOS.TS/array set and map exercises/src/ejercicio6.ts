import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sociosActivos: Set<number> = new Set([5001, 5002, 5003]);

const mostrarMenu = async (): Promise<void> => {
    console.log('\n=== Gestión de Socios Activos ===');
    console.log('1. Ver socios activos');
    console.log('2. Agregar socio');
    console.log('3. Verificar socio');
    console.log('4. Eliminar socio');
    console.log('5. Salir');

    const opcion = await new Promise<string>((resolve) => {
        rl.question('Seleccione una opción: ', resolve);
    });

    switch (opcion) {
        case '1':
            mostrarSocios();
            break;
        case '2':
            await agregarSocio();
            break;
        case '3':
            await verificarSocio();
            break;
        case '4':
            await eliminarSocio();
            break;
        case '5':
            rl.close();
            return;
        default:
            console.log('Opción no válida. Intente nuevamente.');
    }

    await mostrarMenu();
};

const mostrarSocios = (): void => {
    console.log('\nSocios activos:');
    if (sociosActivos.size === 0) {
        console.log('No hay socios registrados.');
    } else {
        console.log(Array.from(sociosActivos).join(', '));
    }
};

const agregarSocio = async (): Promise<void> => {
    const numeroSocio = await obtenerNumeroSocio('Ingrese el número del nuevo socio: ');
    
    if (sociosActivos.has(numeroSocio)) {
        console.log(`El socio ${numeroSocio} ya existe.`);
    } else {
        sociosActivos.add(numeroSocio);
        console.log(`Socio ${numeroSocio} agregado correctamente.`);
    }
};

const verificarSocio = async (): Promise<void> => {
    const numeroSocio = await obtenerNumeroSocio('Ingrese el número del socio a verificar: ');
    
    console.log(
        `El socio ${numeroSocio} ${sociosActivos.has(numeroSocio) ? 'SÍ' : 'NO'} está activo.`
    );
};

const eliminarSocio = async (): Promise<void> => {
    const numeroSocio = await obtenerNumeroSocio('Ingrese el número del socio a eliminar: ');
    
    if (sociosActivos.delete(numeroSocio)) {
        console.log(`Socio ${numeroSocio} eliminado correctamente.`);
    } else {
        console.log(`El socio ${numeroSocio} no existe.`);
    }
};

const obtenerNumeroSocio = async (mensaje: string): Promise<number> => {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            rl.question(mensaje, resolve);
        });

        const numero = parseInt(input);
        
        if (!isNaN(numero)) {
            return numero;
        }
        
        console.log('Por favor ingrese un número válido.');
    }
};

rl.on('close', () => {
    console.log('\n=== Resumen final ===');
    console.log('Socios activos:', Array.from(sociosActivos).join(', '));
    console.log('Total de socios:', sociosActivos.size);
    console.log('Aplicación terminada.');
    process.exit(0);
});

console.log('=== Sistema de Gestión de Socios ===');
mostrarMenu().catch(err => {
    console.error('Error:', err);
    rl.close();
});