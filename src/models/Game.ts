import { Gameboard } from './Gameboard';
import { Player } from './Player';

export class Game {
  constructor(
    public players: Player[],
    public board: string[],
    public activePlayer: Player,
    public isGameDone: boolean
  ) {}
}
