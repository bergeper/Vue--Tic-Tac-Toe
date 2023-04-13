import { Player } from '../models/Player';

let playersFromLS: Player[] = [];

export function getFromLocalStorage(): Player[] {
  playersFromLS = JSON.parse(localStorage.getItem('players') || '[]');
  let players = playersFromLS.map((player) => {
    return new Player(player.symbol, player.name, player.score);
  });
  return players;
}
