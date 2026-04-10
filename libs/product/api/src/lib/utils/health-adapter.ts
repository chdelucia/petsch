import { HealthStatus } from '../models/product';

export interface HealthStrategy {
  calculate(
    weight: number,
    height: number,
    length: number,
    numberOfLives?: number,
  ): HealthStatus;
}

export class DefaultHealthStrategy implements HealthStrategy {
  calculate(weight: number, height: number, length: number): HealthStatus {
    const score = weight / (height * length);

    if (score >= 2 && score < 3) {
      return 'very healthy';
    }

    if (score >= 3 && score <= 5) {
      return 'healthy';
    }

    return 'unhealthy';
  }
}

export class CatHealthStrategy extends DefaultHealthStrategy {
  override calculate(
    weight: number,
    height: number,
    length: number,
    numberOfLives?: number,
  ): HealthStatus {
    if (numberOfLives === 1) {
      return 'unhealthy';
    }
    return super.calculate(weight, height, length);
  }
}

const strategies: Record<string, HealthStrategy> = {
  cat: new CatHealthStrategy(),
  default: new DefaultHealthStrategy(),
};

export function calculateHealth(
  kind: string,
  weight: number,
  height: number,
  length: number,
  numberOfLives?: number,
): HealthStatus {
  const strategy = strategies[kind.toLowerCase()] || strategies['default'];
  return strategy.calculate(weight, height, length, numberOfLives);
}
