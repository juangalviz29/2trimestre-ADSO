const readline = require('readline-sync');

const hotel = {
    habitaciones: [0, 0, 0, 0, 0],

    mostrarEstado() {
        console.log("\nEstado de habitaciones:");
        this.habitaciones.forEach((h, i) => {
            console.log(`- Habitacion ${i + 1}: ${h === 0 ? "Libre" : "Ocupada"}`);
        });
    },

    reservar(num: number) {
        if (num < 1 || num > 5) {
            console.log("Numero invalido. Usa 1 - 5.");
        } else if (this.habitaciones[num - 1] === 1) {
            console.log("La habitacion ya esta ocupada.");
        } else {
            this.habitaciones[num - 1] = 1;
            console.log(`Habitacion ${num} reservada.`);
        }
    },

    liberar(num: number) {
        if (num < 1 || num > 5) {
            console.log("Numero invalido. Usa 1 - 5.");
        } else if (this.habitaciones[num - 1] === 0) {
            console.log("La habitacion ya esta libre.");
        } else {
            this.habitaciones[num - 1] = 0;
            console.log(`Habitacion ${num} liberada.`);
        }
    },

    iniciar() {
        while (true) {
            const op = readline.question(
                "\nMenu Hotel\n" +
                "1. Ver estado\n" +
                "2. Reservar habitacion\n" +
                "3. Liberar habitacion\n" +
                "4. Volver\n" +
                "Elige una opcion: "
            );
            if (op === "1") this.mostrarEstado();
            else if (op === "2") this.reservar(parseInt(readline.question("Numero de habitacion (1-5): ")));
            else if (op === "3") this.liberar(parseInt(readline.question("Numero de habitacion (1-5): ")));
            else if (op === "4") break;
            else console.log("Opcion invalida.");
        }
    }
};

const cajero = {
    saldo: 0,
    transacciones: [] as number[],

    consultarSaldo() {
        console.log(`Saldo actual: $${this.saldo}`);
    },

    depositar(monto: number) {
        if (monto > 0) {
            this.saldo += monto;
            this.transacciones.push(monto);
            console.log(`Depositaste $${monto}`);
        } else {
            console.log("Monto invalido.");
        }
    },

    retirar(monto: number) {
        if (monto > 500) console.log("Maximo $500 por retiro.");
        else if (monto > this.saldo) console.log("Saldo insuficiente.");
        else {
            this.saldo -= monto;
            this.transacciones.push(-monto);
            console.log(`Retiraste $${monto}`);
        }
    },

    iniciar() {
        while (true) {
            const op = readline.question(
                "\nMenu Cajero\n" +
                "1. Consultar saldo\n" +
                "2. Depositar dinero\n" +
                "3. Retirar dinero\n" +
                "4. Volver\n" +
                "Elige una opcion: "
            );
            if (op === "1") this.consultarSaldo();
            else if (op === "2") this.depositar(parseFloat(readline.question("Monto a depositar: ")));
            else if (op === "3") this.retirar(parseFloat(readline.question("Monto a retirar: ")));
            else if (op === "4") break;
            else console.log("Opcion invalida.");
        }
    }
};

const supermercado = {
    cola: [] as string[],
    capacidad: 7,

    agregar(nombre: string) {
        if (this.cola.length < this.capacidad) {
            this.cola.push(nombre);
            console.log(`${nombre} agregado a la cola.`);
        } else {
            console.log("La cola esta llena.");
        }
    },

    atender() {
        if (this.cola.length > 0) {
            const cliente = this.cola.shift();
            console.log(`Atendiendo a ${cliente}`);
        } else {
            console.log("No hay clientes en la cola.");
        }
    },

    iniciar() {
        while (true) {
            const op = readline.question(
                "\nMenu Supermercado\n" +
                "1. Agregar cliente\n" +
                "2. Atender cliente\n" +
                "3. Volver\n" +
                "Elige una opcion: "
            );
            if (op === "1") this.agregar(readline.question("Nombre del cliente: "));
            else if (op === "2") this.atender();
            else if (op === "3") break;
            else console.log("Opcion invalida.");
        }
    }
};

const maquina = {
    productos: ["Galletas", "Refresco", "Chocolates", "Caramelos", "Chips"],
    cantidades: [5, 5, 5, 5, 5],

    mostrarInventario() {
        console.log("\nInventario de la maquina:");
        for (let i = 0; i < this.productos.length; i++) {
            console.log(`${i + 1}. ${this.productos[i]} - Cantidad: ${this.cantidades[i]}`);
        }
    },

    sugerir() {
        for (let i = 0; i < this.cantidades.length; i++) {
            if (this.cantidades[i] > 0) return this.productos[i];
        }
        return "No hay productos disponibles.";
    },

    comprar(codigo: number) {
        if (this.cantidades[codigo - 1] > 0) {
            this.cantidades[codigo - 1]--;
            console.log(`Compraste: ${this.productos[codigo - 1]}`);
        } else {
            console.log(`${this.productos[codigo - 1]} esta agotado. Sugerencia: ${this.sugerir()}`);
        }
    },

    iniciar() {
        while (true) {
            const op = readline.question(
                "\nMenu Maquina Expendedora\n" +
                "1. Ver inventario\n" +
                "2. Comprar producto\n" +
                "3. Volver\n" +
                "Elige una opcion: "
            );
            if (op === "1") this.mostrarInventario();
            else if (op === "2") {
                const codigo = parseInt(readline.question("Codigo del producto (1-5): "));
                if (codigo >= 1 && codigo <= 5) this.comprar(codigo);
                else console.log("Codigo invalido.");
            } else if (op === "3") break;
            else console.log("Opcion invalida.");
        }
    }
};

function mainMenu() {
    while (true) {
        const op = readline.question(
            "\n=== Menu Principal ===\n" +
            "1. Hotel\n" +
            "2. Cajero\n" +
            "3. Supermercado\n" +
            "4. Maquina Expendedora\n" +
            "5. Salir\n" +
            "Selecciona una opcion: "
        );
        if (op === "1") hotel.iniciar();
        else if (op === "2") cajero.iniciar();
        else if (op === "3") supermercado.iniciar();
        else if (op === "4") maquina.iniciar();
        else if (op === "5") { console.log("Saliendo del programa..."); break; }
        else console.log("Opcion invalida.");
    }
}

mainMenu();
