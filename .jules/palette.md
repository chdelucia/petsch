# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-04-23 - [Dropdown Accessibility & Keyboard Support]
**Learning:** Shared UI components like buttons often lack the necessary hooks for complex accessibility patterns (e.g., disclosure or menu patterns). Implementing generic ARIA signal inputs on base components enables consistent a11y across the library. For dropdowns, a standard pattern includes `aria-expanded`, `aria-haspopup`, `aria-controls`, and keyboard listeners for `Escape`, `Enter`, and `Space`.
**Action:** Always ensure base button components support standard ARIA attributes and that interactive list-like components (dropdowns, selects) implement full keyboard navigation (Enter/Space for selection, Escape for dismissal).
