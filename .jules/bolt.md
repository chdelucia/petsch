## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-23 - [ISO Date Sorting]
**Learning:** Comparing ISO date strings (YYYY-MM-DD) directly using comparison operators (`>` or `<`) is significantly more efficient than instantiating `Date` objects and calling `getTime()`, especially within O(N log N) sorting algorithms.
**Action:** Use direct string comparison for ISO dates in Signal Store `computed` signals or array `sort` calls.
