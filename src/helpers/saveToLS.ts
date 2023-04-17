import { Game } from '../models/Game';

export const gameToLS = (gameToLS: Game) => {
  localStorage.setItem('game', JSON.stringify(gameToLS));
};
