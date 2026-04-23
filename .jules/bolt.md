## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-23 - [OnPush Strategy for Core UI]
**Learning:** In a signal-based Angular architecture, core presentational components (buttons, badges, pagination, etc.) should explicitly use `ChangeDetectionStrategy.OnPush`. This prevents the entire component tree from being checked unnecessarily on every event, as signals provide the necessary granularity for updates.
**Action:** Ensure all new shared UI components are initialized with `OnPush` change detection.
