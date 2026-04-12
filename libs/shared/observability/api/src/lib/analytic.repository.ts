export interface IAnalyticsService {
  sendEvent(name: string, params?: Record<string, unknown>): void;
  trackCart(id: string, title: string, price: number): void;
}
