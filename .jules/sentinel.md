## 2026-04-23 - [Privacy/Security] Sentry PII and Search Input Limits
**Vulnerability:** Sentry was configured with `sendDefaultPii: true`, potentially leaking sensitive user data to monitoring logs. Additionally, the search component lacked input length constraints and search history capping, posing risks of unbounded resource growth (DoS/Memory).
**Learning:** Default configurations in third-party libraries (like Sentry) often favor data collection over privacy and must be explicitly audited. UI components handling user-generated lists (like search history) should always have defined bounds.
**Prevention:** Audit all monitoring and tracking initializations for PII collection settings. Implement `maxlength` and collection size limits on all user-controlled inputs and states.

## 2026-04-24 - [Security] Information Exposure and Secure Navigation
**Vulnerability:** The application was exposing raw backend error messages (`err.message`) to users in the `ProductsStore`. Navigation links between micro-frontend apps also lacked the `rel="noopener"` security attribute.
**Learning:** Store-level error handling must sanitize user-facing messages while maintaining observability via internal logging. Even internal micro-frontend navigation should be treated with defensive security attributes to prevent potential window object hijacking.
**Prevention:** Always mask raw error messages with generic strings (e.g., 'Failed to load products') in the UI. Consistently apply `rel="noopener"` to links targeting different application origins.
