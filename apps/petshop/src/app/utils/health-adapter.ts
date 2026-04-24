export type HealthStatus = 'unhealthy' | 'healthy' | 'very healthy';

export interface PetProduct {
  weight?: number;
  height?: number;
  length?: number;
  kind?: string;
  number_of_lives?: number;
}

export interface HealthStrategy {
  calculate(product: PetProduct): HealthStatus;
}

export class DefaultHealthStrategy implements HealthStrategy {
  calculate(product: PetProduct): HealthStatus {
    const { weight, height, length } = product;
    if (weight == null || height == null || length == null) return 'unhealthy';

    if (height === 0 || length === 0) return 'unhealthy';

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
  override calculate(product: PetProduct): HealthStatus {
    if (product.number_of_lives === 1) {
      return 'unhealthy';
    }
    return super.calculate(product);
  }
}

const strategies: Record<string, HealthStrategy> = {
  cat: new CatHealthStrategy(),
  default: new DefaultHealthStrategy(),
};

export function getHealthStrategy(kind: string): HealthStrategy {
  return strategies[kind.toLowerCase()] || strategies['default'];
}

export function enrichProductWithHealth(product: PetProduct): PetProduct & { health: HealthStatus } {
  const strategy = getHealthStrategy(product.kind || '');
  return {
    ...product,
    health: strategy.calculate(product),
  };
}
