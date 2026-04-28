## 2026-04-22 - [Angular Performance Pattern]
**Learning:** In list-heavy components like `ChCard`, using `OnPush` change detection and `computed` signals for derived data (like routes) is critical. `computed` signals memoize results, preventing unnecessary array allocations and reference changes that trigger downstream directive updates.
**Action:** Always favor `OnPush` and `computed` signals in presentational components used within `@for` loops.

## 2026-04-28 - [Zoneless Performance: OnPush in Shared Components]
**Learning:** Even for components that aren't in large loops, like `ChNavbar`, implementing `ChangeDetectionStrategy.OnPush` is a key performance win in a zoneless Angular application. It ensures the component is only checked when its inputs or internal signals change, reducing total change detection time.
**Action:** Default to `OnPush` for all shared UI components to maintain a lean change detection tree.
