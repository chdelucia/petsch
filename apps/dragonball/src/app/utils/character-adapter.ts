import { Character } from '../models/character';

export const characterAdapter = (item: Character) => ({
  ...item,
  photo_url: item.image,
  health: 'healthy',
  kind: item.race,
});
