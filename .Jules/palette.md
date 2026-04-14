## 2026-04-14 - [Aria Label Semantics]
**Learning:** Using generic 'close' labels for destructive or removal actions is semantically misleading for screen reader users. Accessibility labels must precisely describe the action (e.g., 'Remove' vs 'Close').
**Action:** Always verify that `aria-label` values match the specific functional intent of the button rather than reusing visually similar action labels.
