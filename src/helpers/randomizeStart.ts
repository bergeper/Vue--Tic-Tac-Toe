import { Player } from '../models/Player';

export const randomizePlayer = (
  playerOne: Player,
  playerTwo: Player
): Player => {
  const playerToStart = Math.random() > 0.5 ? playerOne : playerTwo;
  return playerToStart;
};
