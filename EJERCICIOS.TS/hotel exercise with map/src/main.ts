import * as readline from 'readline';

interface HabitacionInfo {
    estado: 'libre' | 'ocupada';
    cliente: string | null;
    fechaReserva: string | null;
    tipo: 'estándar' | 'suite';
}

class HotelApp {
    private habitaciones: Map<number, HabitacionInfo>;
    private clientes: Set<string>;
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.habitaciones = new Map();
        this.clientes = new Set();

        for (let i = 1; i <= 5; i++) {
            this.habitaciones.set(i, {
                estado: 'libre',
                cliente: null,
                fechaReserva: null,
                tipo: i <= 3 ? 'estándar' : 'suite'
            });
        }

        this.mostrarBienvenida();
    }

    private mostrarBienvenida(): void {
        console.log("Bienvenido al Sistema de Gestión Hotelera\n");
        console.log("Este sistema le permite administrar las 5 habitaciones del hotel (3 estándar y 2 suites).");
        console.log("Podrá reservar, liberar y consultar el estado de las habitaciones.\n");
        
        this.mostrarMenu();
    }

    private mostrarMenu(): void {
        console.log("\nMENÚ PRINCIPAL");
        console.log("1. Ver estado de habitaciones");
        console.log("2. Reservar habitación");
        console.log("3. Liberar habitación");
        console.log("4. Buscar cliente");
        console.log("5. Mostrar todos los clientes");
        console.log("6. Salir");

        this.rl.question("Elige una opción (1-6): ", (opcion) => {
            switch (opcion) {
                case "1":
                    this.mostrarEstado();
                    break;
                case "2":
                    this.reservarHabitacionFlow();
                    break;
                case "3":
                    this.liberarHabitacionFlow();
                    break;
                case "4":
                    this.buscarClienteFlow();
                    break;
                case "5":
                    this.mostrarClientes();
                    break;
                case "6":
                    this.salir();
                    return;
                default:
                    console.log("Opción inválida. Por favor, elige un número del 1 al 6.");
                    this.mostrarMenu();
            }
        });
    }

    private mostrarEstado(): void {
        console.log("\nEstado de habitaciones:");
        this.habitaciones.forEach((info, num) => {
            console.log(`Habitación ${num} (${info.tipo}): ${info.estado === 'libre' ? 'Libre' : 
                        `Ocupada por ${info.cliente} (desde ${info.fechaReserva})`}`);
        });
        
        console.log(`\nTotal clientes únicos: ${this.clientes.size}`);
        this.mostrarMenu();
    }

    private reservarHabitacionFlow(): void {
        this.rl.question("Ingresa el número de habitación (1 - 5): ", (numInput) => {
            const numReservar = parseInt(numInput);
            
            if (isNaN(numReservar) || numReservar < 1 || numReservar > 5) {
                console.log("Número de habitación inválido. Debe ser entre 1 y 5.");
                this.mostrarMenu();
                return;
            }

            this.rl.question("Ingresa el nombre del cliente: ", (nombreCliente) => {
                this.reservarHabitacion(numReservar, nombreCliente);
                this.mostrarMenu();
            });
        });
    }

    private reservarHabitacion(num: number, nombreCliente: string): void {
        if (!this.habitaciones.has(num)) {
            console.log("Número de habitación inválido. Usa 1 - 5.");
            return;
        }

        const habitacion = this.habitaciones.get(num)!;
        
        if (habitacion.estado === 'ocupada') {
            console.log(`Habitación ${num} ya ocupada por ${habitacion.cliente}.`);
            return;
        }

        if (!nombreCliente || nombreCliente.trim() === '') {
            console.log("Debe proporcionar un nombre de cliente.");
            return;
        }

        const fechaActual = new Date().toLocaleDateString();
        habitacion.estado = 'ocupada';
        habitacion.cliente = nombreCliente;
        habitacion.fechaReserva = fechaActual;
        
        this.clientes.add(nombreCliente);
        
        console.log(`Habitación ${num} reservada con éxito para ${nombreCliente}.`);
    }

    private liberarHabitacionFlow(): void {
        this.rl.question("Ingresa el número de habitación (1 - 5): ", (numInput) => {
            const numLiberar = parseInt(numInput);
            
            if (isNaN(numLiberar) || numLiberar < 1 || numLiberar > 5) {
                console.log("Número de habitación inválido. Debe ser entre 1 y 5.");
                this.mostrarMenu();
                return;
            }

            this.liberarHabitacion(numLiberar);
            this.mostrarMenu();
        });
    }

    private liberarHabitacion(num: number): void {
        if (!this.habitaciones.has(num)) {
            console.log("Número de habitación inválido. Usa 1 - 5.");
            return;
        }

        const habitacion = this.habitaciones.get(num)!;
        
        if (habitacion.estado === 'libre') {
            console.log("Habitación ya está libre.");
            return;
        }

        const clienteLiberado = habitacion.cliente;
        habitacion.estado = 'libre';
        habitacion.cliente = null;
        habitacion.fechaReserva = null;
        
        console.log(`Habitación ${num} liberada. Buen viaje, ${clienteLiberado}!`);
    }

    private buscarClienteFlow(): void {
        this.rl.question("Ingresa el nombre del cliente a buscar: ", (nombreBuscar) => {
            this.buscarCliente(nombreBuscar);
            this.mostrarMenu();
        });
    }

    private buscarCliente(nombre: string): void {
        const habitacionesOcupadas: number[] = [];
        
        this.habitaciones.forEach((info, num) => {
            if (info.estado === 'ocupada' && info.cliente?.toLowerCase().includes(nombre.toLowerCase())) {
                habitacionesOcupadas.push(num);
            }
        });

        if (habitacionesOcupadas.length > 0) {
            console.log(`${nombre} está en las habitaciones: ${habitacionesOcupadas.join(', ')}`);
        } else {
            console.log(`No se encontró a ${nombre} en ninguna habitación.`);
        }
    }

    private mostrarClientes(): void {
        if (this.clientes.size === 0) {
            console.log("No hay clientes registrados.");
            this.mostrarMenu();
            return;
        }

        console.log("\nClientes registrados:");
        this.clientes.forEach(cliente => {
            console.log(`- ${cliente}`);
        });
        
        this.mostrarMenu();
    }

    private salir(): void {
        console.log("Gracias por usar el Sistema de Gestión Hotelera. ¡Hasta pronto!");
        this.rl.close();
    }
}

const hotelApp = new HotelApp();