## 2025-05-14 - [Optimize View Transition Name Lookup]
**Learning:** Performing recursive route snapshot traversal (`findParam`) within a method that is called frequently during rendering (like `getViewTransitionName` for each item in a list) can lead to $O(N \cdot D)$ complexity.
**Action:** Use Angular `computed` signals to pre-calculate values from route snapshots once per transition, reducing the lookup complexity to $O(1)$ per call during rendering.

## 2025-05-20 - [Optimize HttpParams Construction]
**Learning:** Iteratively calling `.set()` on `HttpParams` is inefficient as it creates a new immutable instance on every call.
**Action:** Use the `fromObject` constructor with a pre-filtered object to create a single `HttpParams` instance, reducing unnecessary object allocations during API requests.

## 2025-05-22 - [Tailwind v4 @reference and Component Style Budgets]
**Learning:** In Tailwind v4, referencing entry points that contain full `@import "tailwindcss"` in individual components using `@reference` can significantly increase individual component CSS sizes (~6KB+ per component). This happens because `@reference` with `@apply` still emits all CSS variables defined in the theme into the component's scoped style.
**Action:** To minimize bloat, point components to minimal theme-only files. If budget violations still occur, increase performance budgets for `anyComponentStyle` to reflect the overhead of modern utility-first frameworks with CSS variables.

## 2025-05-22 - [Pre-calculating Template Properties for Lists]
**Learning:** Calling methods in Angular templates for every item in a list (e.g., `getViewTransitionName(item.id)`) is inefficient as it executes on every change detection cycle.
**Action:** Transform data in a `computed` signal to pre-calculate these properties for each item. This shifts the computation from the rendering phase to the data update phase, ensuring the template only performs a simple property access.
