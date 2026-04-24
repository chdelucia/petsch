## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-24 - [Zoneless and OnPush]
**Learning:** In a zoneless Angular application (using `provideZonelessChangeDetection`), `ChangeDetectionStrategy.OnPush` remains a critical optimization. It ensures that components are only checked when they are explicitly marked dirty (e.g., via Signal updates or events), preventing unnecessary re-renders when other parts of the application state change.
**Action:** Ensure all presentational and leaf components use `OnPush` to minimize the change detection footprint in zoneless architectures.
