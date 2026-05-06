## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-27 - [Store Optimization]
**Learning:** Reusing computed signals in NgRx SignalStore (like sharing a `todayEntry` between `todayItem` and `isItemAddedToday`) reduces redundant array traversals and date string generations. Additionally, ISO date strings (YYYY-MM-DD) sort correctly lexicographically, allowing for efficient sorting using `localeCompare` without the overhead of `new Date()` allocations.
**Action:** Always check for redundant logic in computed signals and prefer string comparisons for ISO dates in sort functions.

## 2026-05-15 - [Change Detection Optimization]
**Learning:** Implementing `ChangeDetectionStrategy.OnPush` across all shared UI components and feature components is vital in a zoneless Angular environment. It significantly reduces the number of change detection cycles. Refactoring static arrays or derived data into `computed` signals in components like `ChNavbar` ensures proper memoization and reactive updates without manual intervention or unnecessary re-renders.
**Action:** Always default to `OnPush` for new components and refactor existing ones to use `computed` signals for derived state.
