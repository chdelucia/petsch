export interface IAnalyticsService {
  sendEvent(name: string, params?: Record<string, unknown>): void;
  trackAddToFavorites(id: string, title: string, price: number): void;
}
