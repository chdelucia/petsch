export interface ItemOfTheDayEntry<T = unknown> {
  product: T;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface ItemOfTheDayState<T = unknown> {
  entries: ItemOfTheDayEntry<T>[];
  isOpen: boolean;
}
