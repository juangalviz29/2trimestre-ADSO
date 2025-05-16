import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calcularPotencia = (base: number, exponente: number): number | string => {
    if (!Number.isInteger(base) || !Number.isInteger(exponente)) {
        return "Ambos números deben ser enteros.";
    }

    if (exponente === 0) {
        return 1;
    }

    if (base === 0 && exponente < 0) {
        return "No se puede realizar la operación.";
    }

    let resultado = 1; 

    for (let i = 0; i < Math.abs(exponente); i++) {
        resultado *= base;
    }

    return exponente < 0 ? 1 / resultado : resultado;
}

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

const main = async (): Promise<void> => {
    console.log('=== Calculadora de Potencia ===');

    try {
        const base = await obtenerNumeroEntero('Ingrese la base (entero): ');
        const exponente = await obtenerNumeroEntero('Ingrese el exponente (entero): ');

        const resultado = calcularPotencia(base, exponente);
        
        if (typeof resultado === 'string') {
            console.log(`\nError: ${resultado}`);
        } else {
            console.log(`\nResultado: ${base}^${exponente} = ${resultado}`);
        }
    } catch (err) {
        console.error('Ocurrió un error:', err);
    } finally {
        rl.close();
    }
};

main().then(() => {
    console.log('Calculadora finalizada.');
}).catch(err => {
    console.error('Error inesperado:', err);
    rl.close();
});