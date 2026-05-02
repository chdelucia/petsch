## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-27 - [Store Optimization]
**Learning:** Reusing computed signals in NgRx SignalStore (like sharing a `todayEntry` between `todayItem` and `isItemAddedToday`) reduces redundant array traversals and date string generations. Additionally, ISO date strings (YYYY-MM-DD) sort correctly lexicographically, allowing for efficient sorting using `localeCompare` without the overhead of `new Date()` allocations.
**Action:** Always check for redundant logic in computed signals and prefer string comparisons for ISO dates in sort functions.

## 2026-05-02 - [SignalStore Optimization]
**Learning:** Hoisting `RegExp` instantiation to the `withComputed` factory scope prevents repeated object allocations on every signal evaluation. Reusing local `computed` signals within other signals (like `currentPage` in `totalPages`) leverages Angular's memoization and avoids redundant dictionary lookups and logical evaluations.
**Action:** Always hoist static or config-dependent objects (like `RegExp`) outside of individual signal definitions in SignalStores and reuse signals to share derived state efficiently.
