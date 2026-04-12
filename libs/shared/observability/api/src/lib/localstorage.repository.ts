export interface ILocalStorageService {
  getValue<T>(key: string): T | null;
  setValue<T>(key: string, value: T): void;
  clearValue(key: string): void;
  clearAll(): void;
}
