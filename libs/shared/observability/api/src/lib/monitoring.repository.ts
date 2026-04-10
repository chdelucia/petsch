export interface IMonitoringService {
  init(): void;
  captureException(error: unknown): void;
  captureMessage(message: string): void;
}
