import { Pet, HealthStatus } from '../models/product';

export interface HealthStrategy {
  calculate(pet: Pet): HealthStatus;
}

export class DefaultHealthStrategy implements HealthStrategy {
  calculate(pet: Pet): HealthStatus {
    const { weight, height, length } = pet;
    if (!weight || !height || !length) return 'unhealthy';

    const score = weight / (height * length);

    if (score < 2 || score > 5) {
      return 'unhealthy';
    } else if (score >= 2 && score < 3) {
      return 'very healthy';
    } else {
      return 'healthy';
    }
  }
}

export class CatHealthStrategy extends DefaultHealthStrategy {
  override calculate(pet: Pet): HealthStatus {
    if (pet.number_of_lives === 1) {
      return 'unhealthy';
    }
    return super.calculate(pet);
  }
}

const strategies: Record<string, HealthStrategy> = {
  cat: new CatHealthStrategy(),
  default: new DefaultHealthStrategy(),
};

export function getHealthStrategy(kind: string): HealthStrategy {
  return strategies[kind.toLowerCase()] || strategies['default'];
}

export function enrichPetWithHealth(pet: Pet): Pet {
  const strategy = getHealthStrategy(pet.kind);
  return {
    ...pet,
    health: strategy.calculate(pet),
  };
}
