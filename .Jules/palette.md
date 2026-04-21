## 2025-05-15 - [Accessible Link Overlays]
**Learning:** When using the "link overlay" pattern (where a single `<a>` tag covers a whole card), standard focus indicators often fail to appear or look awkward. Using `focus-visible` on the overlay link with a custom ring offset ensures keyboard users can clearly identify the focused card without cluttering the UI for mouse users.
**Action:** Always apply `focus-visible:ring-2` with an appropriate `ring-offset` to link-overlay elements in card components.
