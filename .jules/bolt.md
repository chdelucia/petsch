## 2025-05-15 - [Optimize view transition ID lookup]
**Learning:** Recursive traversal of `ActivatedRouteSnapshot` (using `findParam`) inside template-triggered methods like `getViewTransitionName` creates an $O(N \cdot D)$ performance bottleneck during view transitions.
**Action:** Pre-calculate these values using `computed` signals to ensure the search runs once per state change rather than per item per render cycle.
