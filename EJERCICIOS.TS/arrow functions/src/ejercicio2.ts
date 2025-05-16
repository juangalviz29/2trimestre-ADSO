import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para calcular MCD con validación de tipos
const calcularMCD = (a: number, b: number): number | string => {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        return "Ambos números deben ser enteros.";
    }

    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
};

// Función para obtener número entero con validación
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
    console.log('=== Calculadora de Máximo Común Divisor (MCD) ===');

    try {
        const num1 = await obtenerNumeroEntero('Ingrese el primer número entero: ');
        const num2 = await obtenerNumeroEntero('Ingrese el segundo número entero: ');

        const resultado = calcularMCD(num1, num2);
        
        if (typeof resultado === 'string') {
            console.log(`\nError: ${resultado}`);
        } else {
            console.log(`\nEl MCD de ${num1} y ${num2} es: ${resultado}`);
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
