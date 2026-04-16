## 2025-05-14 - [Optimize View Transition Name Lookup]
**Learning:** Performing recursive route snapshot traversal (`findParam`) within a method that is called frequently during rendering (like `getViewTransitionName` for each item in a list) can lead to $O(N \cdot D)$ complexity.
**Action:** Use Angular `computed` signals to pre-calculate values from route snapshots once per transition, reducing the lookup complexity to $O(1)$ per call during rendering.
