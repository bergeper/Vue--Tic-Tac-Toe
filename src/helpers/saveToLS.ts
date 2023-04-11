import { Player } from '../models/Player';

export const savePlayerInLS = (playersToLS: Player[]) => {
  localStorage.setItem('players', JSON.stringify(playersToLS));
};
