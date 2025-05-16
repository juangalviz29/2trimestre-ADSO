import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const productsVendidos: Set<number> = new Set([1001, 1002, 1003]);

const verificarProducto = (codigo: number): boolean => {
    return productsVendidos.has(codigo);
};

const preguntarCodigo = async (): Promise<void> => {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            rl.question('Ingrese el código del producto a verificar (o "salir" para terminar): ', resolve);
        });

        if (input.toLowerCase() === 'salir') {
            rl.close();
            return;
        }

        const codigo = parseInt(input);
        
        if (isNaN(codigo)) {
            console.log('Por favor ingrese un número válido.');
            continue;
        }

        const existe = verificarProducto(codigo);
        console.log(`El producto ${codigo} ${existe ? 'SÍ' : 'NO'} está en la lista de vendidos`);
    }
};

console.log('Productos vendidos iniciales:', Array.from(productsVendidos).join(', '));

preguntarCodigo().catch(err => {
    console.error('Error:', err);
    rl.close();
});

rl.on('close', () => {
    console.log('\nAplicación terminada. Lista final de productos vendidos:', Array.from(productsVendidos).join(', '));
    process.exit(0);
});