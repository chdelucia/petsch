export function cleanFilters<T extends Record<string, any>>(
  filters: T,
): Partial<T> {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}
