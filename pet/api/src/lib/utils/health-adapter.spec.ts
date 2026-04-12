import { Pet } from '../models/product';
import { enrichPetWithHealth } from './health-adapter';

describe('HealthAdapter', () => {
  it('should calculate healthy status correctly', () => {
    const pet: Pet = {
      id: 1,
      name: 'Dog',
      kind: 'dog',
      weight: 12,
      height: 2,
      length: 2,
      description: '',
      photo_url: '',
    };
    // score = 12 / (2 * 2) = 3 -> healthy (3 to 5)
    const enriched = enrichPetWithHealth(pet);
    expect(enriched.health).toBe('healthy');
  });

  it('should calculate very healthy status correctly', () => {
    const pet: Pet = {
      id: 1,
      name: 'Dog',
      kind: 'dog',
      weight: 10,
      height: 2,
      length: 2,
      description: '',
      photo_url: '',
    };
    // score = 10 / (2 * 2) = 2.5 -> very healthy (2 to 3)
    const enriched = enrichPetWithHealth(pet);
    expect(enriched.health).toBe('very healthy');
  });

  it('should calculate unhealthy status correctly', () => {
    const pet: Pet = {
      id: 1,
      name: 'Dog',
      kind: 'dog',
      weight: 4,
      height: 2,
      length: 2,
      description: '',
      photo_url: '',
    };
    // score = 4 / (2 * 2) = 1 -> unhealthy (< 2)
    const enriched = enrichPetWithHealth(pet);
    expect(enriched.health).toBe('unhealthy');
  });

  it('should calculate cat with 1 life as unhealthy', () => {
    const pet: Pet = {
      id: 1,
      name: 'Cat',
      kind: 'cat',
      weight: 12,
      height: 2,
      length: 2,
      number_of_lives: 1,
      description: '',
      photo_url: '',
    };
    const enriched = enrichPetWithHealth(pet);
    expect(enriched.health).toBe('unhealthy');
  });

  it('should calculate cat with more lives normally', () => {
    const pet: Pet = {
      id: 1,
      name: 'Cat',
      kind: 'cat',
      weight: 12,
      height: 2,
      length: 2,
      number_of_lives: 9,
      description: '',
      photo_url: '',
    };
    const enriched = enrichPetWithHealth(pet);
    expect(enriched.health).toBe('healthy');
  });
});
