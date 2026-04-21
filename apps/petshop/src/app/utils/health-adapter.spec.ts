import { Product } from '../models/pet';
import { enrichProductWithHealth } from './health-adapter';

describe('HealthAdapter', () => {
  it('should calculate healthy status correctly', () => {
    const product: Product = {
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
    const enriched = enrichProductWithHealth(product);
    expect(enriched.health).toBe('healthy');
  });

  it('should calculate very healthy status correctly', () => {
    const product: Product = {
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
    const enriched = enrichProductWithHealth(product);
    expect(enriched.health).toBe('very healthy');
  });

  it('should calculate unhealthy status correctly', () => {
    const product: Product = {
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
    const enriched = enrichProductWithHealth(product);
    expect(enriched.health).toBe('unhealthy');
  });

  it('should calculate cat with 1 life as unhealthy', () => {
    const product: Product = {
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
    const enriched = enrichProductWithHealth(product);
    expect(enriched.health).toBe('unhealthy');
  });

  it('should calculate cat with more lives normally', () => {
    const product: Product = {
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
    const enriched = enrichProductWithHealth(product);
    expect(enriched.health).toBe('healthy');
  });

  it('should return unhealthy if weight, height or length are 0 due to truthiness check (repro)', () => {
    const product: Product = {
      id: 1,
      name: 'Dog',
      kind: 'dog',
      weight: 12,
      height: 2,
      length: 0,
      description: '',
      photo_url: '',
    };
    const enriched = enrichProductWithHealth(product);
    // Now it returns 'unhealthy' because length is 0 (division by zero protection)
    expect(enriched.health).toBe('unhealthy');
  });

  it('should return healthy if weight is 0 and it is valid (edge case check)', () => {
    const product: Product = {
      id: 1,
      name: 'Dog',
      kind: 'dog',
      weight: 0,
      height: 2,
      length: 2,
      description: '',
      photo_url: '',
    };
    const enriched = enrichProductWithHealth(product);
    // score = 0 / (2 * 2) = 0 -> unhealthy (< 2)
    expect(enriched.health).toBe('unhealthy');
  });
});
