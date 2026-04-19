## 2026-04-18 - [Accessibility & Keyboard Navigation Patterns]
**Learning:** In Angular-based design systems, custom UI components like drawers and dropdowns often miss native browser accessibility features. Specifically:
- `aria-controls` requires a corresponding `id` on the target element; omitting the `id` breaks screen reader associations.
- `TranslocoDirective` (`*transloco`) can trigger unused directive warnings if not properly implemented in components using `@let` or pipes; `TranslocoPipe` is often more robust for simple key translations.
- For modal elements like `ChCartDrawer`, `@HostListener('document:keydown.escape')` is a mandatory pattern to meet WCAG success criteria for keyboard navigability.
- Semantic roles (`listbox`, `option`) and `tabindex="0"` are essential for making non-button interactive elements (like custom dropdown items) focusable and operable via Enter/Space.

**Action:** Always verify `aria-controls` relationships by checking for matching `id`s in the final template, and prioritize `@HostListener` for global keyboard event handling in shared UI libraries.
