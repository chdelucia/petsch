import { calculateHealth } from './health-adapter';

describe('calculateHealth', () => {
  it('should return unhealthy for cats with 1 life', () => {
    expect(calculateHealth('cat', 3000, 25, 40, 1)).toBe('unhealthy');
  });

  it('should return very healthy when score is between 2 and 3', () => {
    // Score = 2500 / (25 * 40) = 2.5
    expect(calculateHealth('dog', 2500, 25, 40)).toBe('very healthy');
  });

  it('should return healthy when score is between 3 and 5', () => {
    // Score = 4000 / (25 * 40) = 4
    expect(calculateHealth('dog', 4000, 25, 40)).toBe('healthy');
  });

  it('should return unhealthy when score is below 2', () => {
    // Score = 1500 / (25 * 40) = 1.5
    expect(calculateHealth('dog', 1500, 25, 40)).toBe('unhealthy');
  });

  it('should return unhealthy when score is above 5', () => {
    // Score = 6000 / (25 * 40) = 6
    expect(calculateHealth('dog', 6000, 25, 40)).toBe('unhealthy');
  });

  it('should handle boundary cases correctly', () => {
    expect(calculateHealth('dog', 2000, 25, 40)).toBe('very healthy'); // score = 2
    expect(calculateHealth('dog', 3000, 25, 40)).toBe('healthy'); // score = 3
    expect(calculateHealth('dog', 5000, 25, 40)).toBe('healthy'); // score = 5
  });
});
