import { Game } from '../models/Game';
import { Player } from '../models/Player';

let gameFromLS: Game;

export function getGameLocalStorage(): Game {
  gameFromLS = JSON.parse(localStorage.getItem('game') as string);
  let playerToStart = gameFromLS.activePlayer;
  if (!gameFromLS) {
    return {
      players: [],
      board: ['', '', '', '', '', '', '', '', ''],
      activePlayer: playerToStart,
      moves: 0,
      win: false,
      tie: false,
    };
  } else {
    return gameFromLS;
  }
}
