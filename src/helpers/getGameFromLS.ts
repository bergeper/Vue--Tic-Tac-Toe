import { Game } from '../models/Game';
import { Player } from '../models/Player';

let gameFromLS: Game;

export function getGameLocalStorage(): Game {
  gameFromLS = JSON.parse(localStorage.getItem('game') as string);
  if (!gameFromLS) {
    return {
      players: [],
      board: ['', '', '', '', '', '', '', '', ''],
      activePlayer: new Player('', '', [], 0),
      moves: 0,
      win: false,
      tie: false,
    };
  }
  return gameFromLS;
}
