import * as readline from 'readline';

type RangoDefectuoso = {
    inicio: number;
    fin: number;
};

function esModeloDefectuoso(numeroModelo: number): boolean {
    const modelosDefectuosos: number[] = [119, 179, 221, 780];
    const rangoDefectuoso: RangoDefectuoso = { inicio: 189, fin: 195 };

    if (modelosDefectuosos.includes(numeroModelo)) {
        return true;
    }

    if (numeroModelo >= rangoDefectuoso.inicio && numeroModelo <= rangoDefectuoso.fin) {
        return true;
    }

    return false;
}

function mostrarMensaje(numeroModelo: number): void {
    if (esModeloDefectuoso(numeroModelo)) {
        console.log("El automóvil está defectuoso, llevar a garantía.");
    } else {
        console.log("Su automóvil no está defectuoso.");
    }
}

function evaluarAutomovil(numeroModelo: number): void {
    mostrarMensaje(numeroModelo);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function obtenerNumeroModelo(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('Ingrese el número de modelo del automóvil: ', (input) => {
            const numero = parseInt(input);
            resolve(isNaN(numero) ? 0 : numero);
        });
    });
}

async function main(): Promise<void> {
    try {
        const numeroModelo = await obtenerNumeroModelo();
        
        if (numeroModelo <= 0) {
            console.log('Por favor ingrese un número de modelo válido.');
        } else {
            evaluarAutomovil(numeroModelo);
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
    }
}

main();