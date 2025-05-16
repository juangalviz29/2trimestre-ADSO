import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

type Ingrediente = 'tocineta' | 'jalapeño' | 'pavo' | 'queso';

async function calcularCostoSandwich() {
    try {
        console.log("¡Bienvenido a la calculadora de sándwiches!\n");

        const tamaño = await new Promise<string>(resolve => {
            rl.question('Seleccione el tamaño (pequeño/grande): ', resolve);
        }).then(res => res.toLowerCase());

        if (tamaño !== 'pequeño' && tamaño !== 'grande') {
            console.log("Tamaño no válido. Debe ser 'pequeño' o 'grande'.");
            process.exit(1);
        }

        console.log("\nSeleccione los ingredientes adicionales:");
        const ingredientes: Record<Ingrediente, boolean> = {
            tocineta: await confirmarIngrediente('¿Desea tocineta? (+$3000)'),
            jalapeño: await confirmarIngrediente('¿Desea jalapeño? (gratis)'),
            pavo: await confirmarIngrediente('¿Desea pavo? (+$3000)'),
            queso: await confirmarIngrediente('¿Desea queso? (+$2500)')
        };

        const costoBase = tamaño === 'pequeño' ? 6000 : 12000;
        
        let costoIngredientes = 0;
        if (ingredientes.tocineta) costoIngredientes += 3000;
        if (ingredientes.jalapeño) costoIngredientes += 0;
        if (ingredientes.pavo) costoIngredientes += 3000;
        if (ingredientes.queso) costoIngredientes += 2500;

        const costoTotal = costoBase + costoIngredientes;

        console.log("\n--- Resumen de su pedido ---");
        console.log(`Tamaño: ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)} - $${costoBase.toLocaleString()}`);
        
        console.log("\nIngredientes adicionales:");
        if (ingredientes.tocineta) console.log("- Tocineta: $3,000");
        if (ingredientes.jalapeño) console.log("- Jalapeño: $0");
        if (ingredientes.pavo) console.log("- Pavo: $3,000");
        if (ingredientes.queso) console.log("- Queso: $2,500");
        
        console.log("\n----------------------------");
        console.log(`TOTAL: $${costoTotal.toLocaleString()}`);
        console.log("----------------------------");

    } catch (error) {
        console.error('Ocurrió un error:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
}

async function confirmarIngrediente(pregunta: string): Promise<boolean> {
    const respuesta = await new Promise<string>(resolve => {
        rl.question(`${pregunta} (s/n): `, resolve);
    });
    return respuesta.toLowerCase() === 's';
}

calcularCostoSandwich();