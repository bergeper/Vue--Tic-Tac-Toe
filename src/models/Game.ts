import { Gameboard } from './Gameboard';
import { Player } from './Player';

export class Game {
  constructor(
    public players: Player[],
    public board: number[],
    public isGameDone: boolean
  ) {}
}
