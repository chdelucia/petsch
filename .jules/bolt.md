## 2025-05-15 - [Anti-pattern: Default Change Detection in Shared UI]
**Learning:** Many core shared UI components (Button, Card, Badge, Pagination) were using the default change detection strategy. In a large application, this leads to excessive dirty checking of presentational components during any event. Since these components use Angular Signals, they are perfect candidates for OnPush.
**Action:** Always check shared UI components for ChangeDetectionStrategy.OnPush, especially when they are logic-light and input-heavy.
