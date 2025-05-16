import * as readline from 'readline';

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para sumar dígitos con validación de tipos
const sumaDigitos = (num: number): number => {
    const numString = Math.abs(num).toString();
    let suma = 0;

    for (let i = 0; i < numString.length; i++) {
        const digito = parseInt(numString[i]);
        suma += digito;
    }

    return suma;
};

// Función para obtener número válido
const obtenerNumero = async (mensaje: string): Promise<number> => {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            rl.question(mensaje, resolve);
        });

        const numero = parseFloat(input);
        
        if (!isNaN(numero)) {
            return numero;
        }
        
        console.log('Por favor ingrese un número válido.');
    }
};

// Función principal interactiva
const main = async (): Promise<void> => {
    console.log('=== Suma de Dígitos ===');

    try {
        const numero = await obtenerNumero('Ingrese un número: ');

        const resultado = sumaDigitos(numero);
        
        console.log(`\nLa suma de los dígitos de ${numero} es: ${resultado}`);
    } catch (err) {
        console.error('Ocurrió un error:', err);
    } finally {
        rl.close();
    }
};

// Ejecutar la aplicación
main().then(() => {
    console.log('Programa finalizado.');
}).catch(err => {
    console.error('Error inesperado:', err);
    rl.close();
});