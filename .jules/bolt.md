## 2026-04-13 - [Route Tree Traversal Optimization]
**Learning:** Performing recursive searches through `ActivatedRouteSnapshot` (e.g., `findParam`) within methods called for every item in a large list template (like `getViewTransitionName`) creates an $O(N \cdot D)$ bottleneck during change detection.
**Action:** Use a `computed` signal to pre-calculate values derived from the route snapshot once per transition change, reducing complexity to $O(D)$ total per transition and $O(1)$ per list item lookup.
