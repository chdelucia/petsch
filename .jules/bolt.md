## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-27 - [Store Optimization]
**Learning:** Reusing computed signals in NgRx SignalStore (like sharing a `todayEntry` between `todayItem` and `isItemAddedToday`) reduces redundant array traversals and date string generations. Additionally, ISO date strings (YYYY-MM-DD) sort correctly lexicographically, allowing for efficient sorting using `localeCompare` without the overhead of `new Date()` allocations.
**Action:** Always check for redundant logic in computed signals and prefer string comparisons for ISO dates in sort functions.

## 2026-07-21 - [HTTP Resource Migration & Fetch Optimization]
**Learning:** Migrating traditional Observable-based XHR endpoints to Angular 22's stable `httpResource` coupled with native browser `FetchBackend` replaces expensive XMLHttpRequest machinery with native Promises. Additionally, using `runInInjectionContext` keeps the API services domain-centric while keeping runtime requests context-safe and memory-efficient.
**Action:** Transition read-heavy APIs to use the native `httpResource` to reduce overhead and leverage Zoneless-friendly browser native Fetch streams.
