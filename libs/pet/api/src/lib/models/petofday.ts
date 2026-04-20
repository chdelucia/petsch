export interface ItemOfDayEntry<T = unknown> {
  product: T;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface ItemOfDayState<T = unknown> {
  entries: ItemOfDayEntry<T>[];
  isOpen: boolean;
}
