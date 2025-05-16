import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para verificar si un número es primo
const esPrimo = (num: number): boolean => {
    if (!Number.isInteger(num) || num < 2) {
        return false;
    }

    if (num === 2) {
        return true;
    }

    if (num % 2 === 0) {
        return false;
    }

    const limite = Math.sqrt(num);
    for (let i = 3; i <= limite; i += 2) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
};

// Función para obtener número entero válido
const obtenerNumeroEntero = async (mensaje: string): Promise<number> => {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            rl.question(mensaje, resolve);
        });

        const numero = parseInt(input);
        
        if (!isNaN(numero)) {
            return numero;
        }
        
        console.log('Por favor ingrese un número entero válido.');
    }
};

// Función principal interactiva
const main = async (): Promise<void> => {
    console.log('=== Verificador de Números Primos ===');

    try {
        const numero = await obtenerNumeroEntero('Ingrese un número entero: ');

        const resultado = esPrimo(numero);
        
        console.log(`\nEl número ${numero} ${resultado ? 'ES' : 'NO ES'} primo.`);
    } catch (err) {
        console.error('Ocurrió un error:', err);
    } finally {
        rl.close();
    }
};

// Ejecutar la aplicación
main().then(() => {
    console.log('Verificador finalizado.');
}).catch(err => {
    console.error('Error inesperado:', err);
    rl.close();
});