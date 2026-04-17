export interface PetOfTheDayEntry<T = any> {
  pet: T;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface PetOfTheDayState<T = any> {
  entries: PetOfTheDayEntry<T>[];
  isOpen: boolean;
}
