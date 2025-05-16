import * as readline from 'readline';

type TamañoSandwich = "pequeño" | "grande";
type Ingrediente = "tocineta" | "pavo" | "queso" | "jalapeño";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function costoBase(tamaño: TamañoSandwich): number | null {
    if (tamaño === "pequeño") {
        return 6000;
    } else if (tamaño === "grande") {
        return 12000;
    } else {
        return null;
    }
}

function costoIngredientes(tocineta: boolean, pavo: boolean, queso: boolean, jalapeño: boolean): number {
    let total = 0;

    if (tocineta) {
        total += 3000;
    }
    if (pavo) {
        total += 3000;
    }
    if (queso) {
        total += 2500;
    }
    if (jalapeño) {
        total += 2000;
    }

    return total;
}

function mostrarTotal(costoTotal: number): void {
    console.log(`\nEl costo total de su pedido es: $${costoTotal.toLocaleString()}\n`);
}

function calcularPedido(tamaño: TamañoSandwich, tocineta: boolean, pavo: boolean, queso: boolean, jalapeño: boolean): void {
    const base = costoBase(tamaño);

    if (base === null) {
        console.log("Tamaño no válido. Debe ser 'pequeño' o 'grande'");
        return;
    }

    const ingredientes = costoIngredientes(tocineta, pavo, queso, jalapeño);
    const total = base + ingredientes;
    mostrarTotal(total);
}

async function obtenerSiNo(pregunta: string): Promise<boolean> {
    return new Promise((resolve) => {
        rl.question(`${pregunta} (s/n): `, (respuesta) => {
            resolve(respuesta.toLowerCase() === 's');
        });
    });
}

async function main(): Promise<void> {
    try {
        console.log("Sistema de pedidos de sandwich\n");

        const tamañoInput = await obtenerEntrada("Ingrese el tamaño del sandwich (pequeño/grande): ");
        const tamaño = tamañoInput.toLowerCase() as TamañoSandwich;

        if (tamaño !== "pequeño" && tamaño !== "grande") {
            console.log("Error: Tamaño no válido");
            rl.close();
            return;
        }

        console.log("\nSeleccione los ingredientes adicionales:");
        const tocineta = await obtenerSiNo("¿Desea tocineta?");
        const pavo = await obtenerSiNo("¿Desea pavo?");
        const queso = await obtenerSiNo("¿Desea queso?");
        const jalapeño = await obtenerSiNo("¿Desea jalapeño?");

        calcularPedido(tamaño, tocineta, pavo, queso, jalapeño);
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        rl.close();
    }
}

async function obtenerEntrada(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pregunta, (input) => {
            resolve(input.trim());
        });
    });
}

main();