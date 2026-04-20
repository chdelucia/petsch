export type HealthStatus = 'unhealthy' | 'healthy' | 'very healthy';

export interface HealthStrategy {
  calculate(product: any): HealthStatus;
}

export class DefaultHealthStrategy implements HealthStrategy {
  calculate(product: any): HealthStatus {
    const { weight, height, length } = product;
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
  override calculate(product: any): HealthStatus {
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

export function enrichProductWithHealth(product: any): any {
  const strategy = getHealthStrategy(product.kind);
  return {
    ...product,
    health: strategy.calculate(product),
  };
}
