import { Pet } from './product';

export interface PetOfTheDayEntry {
  pet: Pet;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface PetOfTheDayState {
  entries: PetOfTheDayEntry[];
  isOpen: boolean;
}
