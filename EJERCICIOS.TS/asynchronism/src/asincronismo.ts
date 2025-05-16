import * as readline from 'readline';
import fetch from 'node-fetch';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (mensaje: string): Promise<string> => {
    return new Promise(resolve => rl.question(mensaje, resolve));
};

async function fetchUserData(userId: number): Promise<void> {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User Data:', userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function main() {
    const input = await preguntar("Ingrese un ID de usuario para buscar: ");
    const userId = parseInt(input);

    await fetchUserData(userId);
    rl.close();
}

main();
