import { Character } from '../models/character';

export const characterAdapter = (item: Character) => ({
  ...item,
  photo_url: item.image,
  health:
    item.status === 'Alive'
      ? 'healthy'
      : item.status === 'Dead'
      ? 'unhealthy'
      : 'unknown',
  description: '',
  kind: item.species,
});
