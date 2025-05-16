import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const preguntar = (mensaje: string): Promise<string> => {
    return new Promise(resolve => {
        rl.question(mensaje, respuesta => resolve(respuesta));
    });
};

// Hotel App
const hotelApp = async () => {
    const habitaciones: number[] = [0, 0, 0, 0, 0];

    const mostrarEstado = () => {
        console.log("Estado de habitaciones:");
        habitaciones.forEach((estado, i) => {
            console.log(`Habitación ${i + 1}: ${estado === 0 ? "Libre" : "Ocupada"}`);
        });
    };

    const reservarHabitacion = (num: number) => {
        if (num < 1 || num > 5) {
            console.log("Número de habitación inválido. Usa 1 - 5.");
        } else if (habitaciones[num - 1] === 1) {
            console.log("Habitación ya ocupada.");
        } else {
            habitaciones[num - 1] = 1;
            console.log(`Habitación ${num} reservada con éxito.`);
        }
    };

    const liberarHabitacion = (num: number) => {
        if (num < 1 || num > 5) {
            console.log("Número de habitación inválido. Usa 1 - 5.");
        } else if (habitaciones[num - 1] === 0) {
            console.log("Habitación ya está libre.");
        } else {
            habitaciones[num - 1] = 0;
            console.log(`Habitación ${num} liberada con éxito.`);
        }
    };

    while (true) {
        const opcion = await preguntar("1. Ver estado\n2. Reservar\n3. Liberar\n4. Salir\nElige una opción: ");
        switch (opcion) {
            case "1":
                mostrarEstado();
                break;
            case "2":
                const numReservar = parseInt(await preguntar("Número de habitación (1-5): "));
                reservarHabitacion(numReservar);
                break;
            case "3":
                const numLiberar = parseInt(await preguntar("Número de habitación (1-5): "));
                liberarHabitacion(numLiberar);
                break;
            case "4":
                console.log("Saliendo...");
                return;
            default:
                console.log("Opción inválida.");
        }
    }
};

// Cajero App
const cajeroApp = async () => {
    const transacciones: number[] = [];
    let saldo: number = 0;

    const consultarSaldo = () => {
        console.log(`Tu saldo actual es: $${saldo}`);
    };

    const depositar = (monto: number) => {
        if (monto > 0) {
            saldo += monto;
            transacciones.push(monto);
            console.log(`Has depositado: $${monto}`);
        } else {
            console.log("El monto debe ser positivo.");
        }
    };

    const retirar = (monto: number) => {
        if (monto > 500) {
            console.log("No puedes retirar más de $500 en una sola transacción.");
        } else if (monto > saldo) {
            console.log("Saldo insuficiente.");
        } else {
            saldo -= monto;
            transacciones.push(-monto);
            console.log(`Has retirado: $${monto}`);
        }
    };

    while (true) {
        const opcion = await preguntar("1. Consultar saldo\n2. Depositar\n3. Retirar\n4. Salir\nElige una opción: ");
        switch (opcion) {
            case "1":
                consultarSaldo();
                break;
            case "2":
                const montoDeposito = parseFloat(await preguntar("Monto a depositar: "));
                depositar(montoDeposito);
                break;
            case "3":
                const montoRetiro = parseFloat(await preguntar("Monto a retirar: "));
                retirar(montoRetiro);
                break;
            case "4":
                console.log("Saliendo...");
                return;
            default:
                console.log("Opción inválida.");
        }
    }
};

// Supermercado App
const supermercadoApp = async () => {
    const cola: string[] = [];
    const capacidad = 7;

    const agregarCliente = (nombre: string) => {
        if (cola.length < capacidad) {
            cola.push(nombre);
            console.log(`${nombre} ha sido agregado a la cola.`);
        } else {
            console.log("La cola está llena.");
        }
    };

    const atenderCliente = () => {
        if (cola.length > 0) {
            const cliente = cola.shift();
            console.log(`Atendiendo a ${cliente}`);
        } else {
            console.log("No hay clientes en la cola.");
        }
    };

    while (true) {
        const opcion = await preguntar("1. Agregar cliente\n2. Atender cliente\n3. Salir\nElige una opción: ");
        switch (opcion) {
            case "1":
                const nombre = await preguntar("Nombre del cliente: ");
                agregarCliente(nombre);
                break;
            case "2":
                atenderCliente();
                break;
            case "3":
                console.log("Saliendo...");
                return;
            default:
                console.log("Opción inválida.");
        }
    }
};

// Máquina Expendedora App
const maquinaExpendedoraApp = async () => {
    const productos: string[] = ["Galletas", "Refresco", "Chocolates", "Caramelos", "Chips"];
    const cantidades: number[] = [5, 5, 5, 5, 5];

    const mostrarInventario = () => {
        console.log("Inventario:");
        productos.forEach((producto, i) => {
            console.log(`${i + 1}. ${producto} - Cantidad: ${cantidades[i]}`);
        });
    };

    const sugerirProducto = (): string => {
        const sugerido = productos.find((_, i) => cantidades[i] > 0);
        return sugerido ?? "No hay productos disponibles.";
    };

    const procesarPago = (codigo: number) => {
        if (cantidades[codigo - 1] > 0) {
            cantidades[codigo - 1]--;
            console.log(`Has comprado: ${productos[codigo - 1]}`);
        } else {
            console.log(`${productos[codigo - 1]} está agotado. Sugerencia: ${sugerirProducto()}`);
        }
    };

    while (true) {
        const opcion = await preguntar("1. Mostrar inventario\n2. Comprar producto\n3. Salir\nElige una opción: ");
        switch (opcion) {
            case "1":
                mostrarInventario();
                break;
            case "2":
                const codigo = parseInt(await preguntar("Código del producto (1 - 5): "));
                if (codigo < 1 || codigo > 5) {
                    console.log("Código inválido.");
                } else {
                    procesarPago(codigo);
                }
                break;
            case "3":
                console.log("Saliendo...");
                return;
            default:
                console.log("Opción inválida.");
        }
    }
};

// Menú principal
const mainMenu = async () => {
    while (true) {
        const opcion = await preguntar("Selecciona una app:\n1. Hotel\n2. Cajero\n3. Supermercado\n4. Expendedora\n5. Salir\nOpción: ");
        switch (opcion) {
            case "1":
                await hotelApp();
                break;
            case "2":
                await cajeroApp();
                break;
            case "3":
                await supermercadoApp();
                break;
            case "4":
                await maquinaExpendedoraApp();
                break;
            case "5":
                console.log("Gracias por usar el sistema.");
                rl.close();
                return;
            default:
                console.log("Opción inválida.");
        }
    }
};

mainMenu();
