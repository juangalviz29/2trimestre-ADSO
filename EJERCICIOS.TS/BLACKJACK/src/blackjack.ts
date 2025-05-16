import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomCard(): number {
  return Math.floor(Math.random() * 10) + 1;
}

function askQuestion(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(question + ' (s/n) ', (answer: string) => {
      resolve(answer.trim().toLowerCase() === 's');
    });
  });
}

async function playTurn(playerName: string, currentScore: number): Promise<number> {
  const newCard: number = getRandomCard();
  const newScore: number = currentScore + newCard;
  console.log(`\n${playerName} recibe un ${newCard}. Total: ${newScore}`);
  
  if (newScore > 21) {
    console.log(`${playerName} se ha pasado de 21. ¡Pierde!`);
  }
  
  return newScore;
}

async function playBlackjack(): Promise<void> {
  console.log('¡Bienvenido al Blackjack con turnos intercalados!\n');
  console.log('Ambos jugadores comienzan con 0 puntos.\n');
  
  const player1Active: boolean = await askQuestion('JUGADOR 1, ¿desea jugar?');
  if (!player1Active) {
    console.log('Jugador 1 no quiere jugar.');
    rl.close();
    return;
  }
  
  const player2Active: boolean = await askQuestion('JUGADOR 2, ¿desea jugar?');
  if (!player2Active) {
    console.log('Jugador 2 no quiere jugar.');
    rl.close();
    return;
  }

  let score1: number = 0;
  let score2: number = 0;
  let player1Standing: boolean = false;
  let player2Standing: boolean = false;
  let currentPlayer: 1 | 2 = 1;

  console.log(`\nJugador 1: ${score1} puntos iniciales`);
  console.log(`Jugador 2: ${score2} puntos iniciales\n`);

  while (true) {
    if (currentPlayer === 1 && !player1Standing && score1 <= 21) {
      console.log('\n--- Turno del Jugador 1 ---');
      const wantsCard = await askQuestion('Jugador 1, ¿quieres una carta?');
      
      if (wantsCard) {
        score1 = await playTurn("Jugador 1", score1);
        if (score1 > 21) break;
      } else {
        player1Standing = true;
        console.log('Jugador 1 se planta.');
      }
    }
    else if (currentPlayer === 2 && !player2Standing && score2 <= 21) {
      console.log('\n--- Turno del Jugador 2 ---');
      const wantsCard = await askQuestion('Jugador 2, ¿quieres una carta?');
      
      if (wantsCard) {
        score2 = await playTurn("Jugador 2", score2);
        if (score2 > 21) break;
      } else {
        player2Standing = true;
        console.log('Jugador 2 se planta.');
      }
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    if ((player1Standing && player2Standing) || 
        (score1 > 21 || score2 > 21)) {
      break;
    }

    if (currentPlayer === 1 && (player1Standing || score1 > 21)) {
      currentPlayer = 2;
    } else if (currentPlayer === 2 && (player2Standing || score2 > 21)) {
      currentPlayer = 1;
    }
  }

  console.log('\n--- RESULTADO FINAL ---');
  console.log(`Jugador 1: ${score1} puntos`);
  console.log(`Jugador 2: ${score2} puntos`);

  if (score1 > 21 && score2 > 21) {
    console.log('Ambos jugadores se han pasado. ¡Empate!');
  } else if (score1 > 21) {
    console.log('¡Jugador 2 gana!');
  } else if (score2 > 21) {
    console.log('¡Jugador 1 gana!');
  } else if (score1 > score2) {
    console.log('¡Jugador 1 gana!');
  } else if (score2 > score1) {
    console.log('¡Jugador 2 gana!');
  } else {
    console.log('¡Empate!');
  }

  rl.close();
}

playBlackjack();
