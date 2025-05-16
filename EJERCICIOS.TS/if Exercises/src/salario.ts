import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function calcularSalario() {
    try {
        
        const nombre = await new Promise<string>(resolve => {
            rl.question('Ingrese su nombre: ', resolve);
        });

        const horasInput = await new Promise<string>(resolve => {
            rl.question('Ingrese el número de horas trabajadas: ', resolve);
        });
        const horas = parseFloat(horasInput);

        if (isNaN(horas) || horas < 0) {
            console.log("Error: Por favor ingrese un número válido de horas.");
            return;
        }

        let salario: number;

        if (horas >= 1 && horas <= 10) {
            salario = horas * 30000; 
        } else if (horas > 10) {
            salario = horas * 33000; 
        } else {
            salario = 0;
        }

        const nombreFormateado = nombre.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        console.log(`\nResumen de pago:`);
        console.log(`- Nombre: ${nombreFormateado}`);
        console.log(`- Horas trabajadas: ${horas}`);
        console.log(`- Salario calculado: $${salario.toLocaleString('es-CO')}`);

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

calcularSalario();