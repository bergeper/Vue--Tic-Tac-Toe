import { Player } from './Player';

export class Game {
  constructor(
    public playerID: Player,
    public spot: number,
    public taken: boolean
  ) {}
}
