export interface IAnalyticsService {
  sendEvent(name: string, params?: Record<string, unknown>): void;
  trackAddToCart(id: string, title: string, price: number): void;
}
