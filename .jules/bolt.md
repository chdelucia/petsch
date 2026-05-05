## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-27 - [Store Optimization]
**Learning:** Reusing computed signals in NgRx SignalStore (like sharing a `todayEntry` between `todayItem` and `isItemAddedToday`) reduces redundant array traversals and date string generations. Additionally, ISO date strings (YYYY-MM-DD) sort correctly lexicographically, allowing for efficient sorting using `localeCompare` without the overhead of `new Date()` allocations.
**Action:** Always check for redundant logic in computed signals and prefer string comparisons for ISO dates in sort functions.

## 2026-05-05 - [Zoneless Performance Pattern]
**Learning:** In zoneless Angular applications, implementing  in feature components that aggregate other components or use service methods in templates (e.g., for View Transitions) is a high-impact optimization. It significantly reduces the overhead of the global change detection cycle by ensuring these components are only checked when their signals or inputs actually change.
**Action:** Prioritize  for all feature-level components in zoneless environments to maintain maximum efficiency as the component tree grows.

## 2026-05-05 - [Zoneless Performance Pattern]
**Learning:** In zoneless Angular applications, implementing `ChangeDetectionStrategy.OnPush` in feature components that aggregate other components or use service methods in templates (e.g., for View Transitions) is a high-impact optimization. It significantly reduces the overhead of the global change detection cycle by ensuring these components are only checked when their signals or inputs actually change.
**Action:** Prioritize `OnPush` for all feature-level components in zoneless environments to maintain maximum efficiency as the component tree grows.
