export interface PetOfTheDayEntry<T = unknown> {
  pet: T;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface PetOfTheDayState<T = unknown> {
  entries: PetOfTheDayEntry<T>[];
  isOpen: boolean;
}
