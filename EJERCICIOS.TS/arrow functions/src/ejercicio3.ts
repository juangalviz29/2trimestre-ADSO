import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para calcular factorial con validación de tipos
const calcularFactorial = (num: number): number | string => {
    if (!Number.isInteger(num)) {
        return "El número debe ser un entero.";
    }
    
    if (num < 0) {
        return "El número debe ser positivo.";
    }
  
    if (num === 0) {
        return 1;
    }

    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    return factorial;
};

// Función para obtener número entero positivo con validación
const obtenerNumeroPositivo = async (mensaje: string): Promise<number> => {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            rl.question(mensaje, resolve);
        });

        const numero = parseInt(input);
        
        if (!isNaN(numero) && numero >= 0) {
            return numero;
        }
        
        console.log('Por favor ingrese un número entero positivo válido.');
    }
};

// Función principal interactiva
const main = async (): Promise<void> => {
    console.log('=== Calculadora de Factorial ===');

    try {
        const numero = await obtenerNumeroPositivo('Ingrese un número entero positivo: ');

        const resultado = calcularFactorial(numero);
        
        if (typeof resultado === 'string') {
            console.log(`\nError: ${resultado}`);
        } else {
            console.log(`\nEl factorial de ${numero} es: ${resultado}`);
        }
    } catch (err) {
        console.error('Ocurrió un error:', err);
    } finally {
        rl.close();
    }
};

// Ejecutar la aplicación
main().then(() => {
    console.log('Calculadora finalizada.');
}).catch(err => {
    console.error('Error inesperado:', err);
    rl.close();
});