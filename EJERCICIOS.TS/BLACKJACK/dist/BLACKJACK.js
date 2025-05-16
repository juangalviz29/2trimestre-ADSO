"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function getRandomCard() {
    return Math.floor(Math.random() * 10) + 1;
}
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question + ' (s/n) ', (answer) => {
            resolve(answer.trim().toLowerCase() === 's');
        });
    });
}
function playTurn(playerName, currentScore) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCard = getRandomCard();
        const newScore = currentScore + newCard;
        console.log(`\n${playerName} recibe un ${newCard}. Total: ${newScore}`);
        if (newScore > 21) {
            console.log(`${playerName} se ha pasado de 21. ¡Pierde!`);
        }
        return newScore;
    });
}
function playBlackjack() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('¡Bienvenido al Blackjack con turnos intercalados!\n');
        console.log('Ambos jugadores comienzan con 0 puntos.\n');
        const player1Active = yield askQuestion('JUGADOR 1, ¿desea jugar?');
        if (!player1Active) {
            console.log('Jugador 1 no quiere jugar.');
            rl.close();
            return;
        }
        const player2Active = yield askQuestion('JUGADOR 2, ¿desea jugar?');
        if (!player2Active) {
            console.log('Jugador 2 no quiere jugar.');
            rl.close();
            return;
        }
        let score1 = 0;
        let score2 = 0;
        let player1Standing = false;
        let player2Standing = false;
        let currentPlayer = 1;
        console.log(`\nJugador 1: ${score1} puntos iniciales`);
        console.log(`Jugador 2: ${score2} puntos iniciales\n`);
        while (true) {
            if (currentPlayer === 1 && !player1Standing && score1 <= 21) {
                console.log('\n--- Turno del Jugador 1 ---');
                const wantsCard = yield askQuestion('Jugador 1, ¿quieres una carta?');
                if (wantsCard) {
                    score1 = yield playTurn("Jugador 1", score1);
                    if (score1 > 21)
                        break;
                }
                else {
                    player1Standing = true;
                    console.log('Jugador 1 se planta.');
                }
            }
            else if (currentPlayer === 2 && !player2Standing && score2 <= 21) {
                console.log('\n--- Turno del Jugador 2 ---');
                const wantsCard = yield askQuestion('Jugador 2, ¿quieres una carta?');
                if (wantsCard) {
                    score2 = yield playTurn("Jugador 2", score2);
                    if (score2 > 21)
                        break;
                }
                else {
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
            }
            else if (currentPlayer === 2 && (player2Standing || score2 > 21)) {
                currentPlayer = 1;
            }
        }
        console.log('\n--- RESULTADO FINAL ---');
        console.log(`Jugador 1: ${score1} puntos`);
        console.log(`Jugador 2: ${score2} puntos`);
        if (score1 > 21 && score2 > 21) {
            console.log('Ambos jugadores se han pasado. ¡Empate!');
        }
        else if (score1 > 21) {
            console.log('¡Jugador 2 gana!');
        }
        else if (score2 > 21) {
            console.log('¡Jugador 1 gana!');
        }
        else if (score1 > score2) {
            console.log('¡Jugador 1 gana!');
        }
        else if (score2 > score1) {
            console.log('¡Jugador 2 gana!');
        }
        else {
            console.log('¡Empate!');
        }
        rl.close();
    });
}
playBlackjack();
