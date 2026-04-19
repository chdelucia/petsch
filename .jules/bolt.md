## 2025-05-14 - [Optimize View Transition Name Lookup]
**Learning:** Performing recursive route snapshot traversal (`findParam`) within a method that is called frequently during rendering (like `getViewTransitionName` for each item in a list) can lead to $O(N \cdot D)$ complexity.
**Action:** Use Angular `computed` signals to pre-calculate values from route snapshots once per transition, reducing the lookup complexity to $O(1)$ per call during rendering.

## 2025-05-20 - [Optimize HttpParams Construction]
**Learning:** Iteratively calling `.set()` on `HttpParams` is inefficient as it creates a new immutable instance on every call.
**Action:** Use the `fromObject` constructor with a pre-filtered object to create a single `HttpParams` instance, reducing unnecessary object allocations during API requests.

## 2026-04-19 - [Optimize Date Sorting in Signals]
**Learning:** Sorting ISO date strings (YYYY-MM-DD) by converting them to Date objects in (N \log N)$ operations is expensive. Direct string comparison using operators is significantly faster. Also, caching the "current date" in a dependency-less computed signal creates a "midnight rollover" bug where the date never updates.
**Action:** Use string operators for ISO date sorting and ensure time-dependent values are recalculated when their reactive dependencies change to avoid stale state.
