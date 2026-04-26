## 2026-04-23 - [Privacy/Security] Sentry PII and Search Input Limits
**Vulnerability:** Sentry was configured with `sendDefaultPii: true`, potentially leaking sensitive user data to monitoring logs. Additionally, the search component lacked input length constraints and search history capping, posing risks of unbounded resource growth (DoS/Memory).
**Learning:** Default configurations in third-party libraries (like Sentry) often favor data collection over privacy and must be explicitly audited. UI components handling user-generated lists (like search history) should always have defined bounds.
**Prevention:** Audit all monitoring and tracking initializations for PII collection settings. Implement `maxlength` and collection size limits on all user-controlled inputs and states.

## 2026-04-24 - [Information Leakage] Raw Error Exposure in Feature Stores
**Vulnerability:** Feature stores were exposing raw `err.message` from API responses to the UI templates, potentially leaking sensitive backend implementation details.
**Learning:** Even with a generic fallback, explicitly prioritizing the raw error message in `setError(err?.message ?? ...)` is a security risk. The established pattern in this repo is to mask these errors and use `MONITORING_TOKEN` for developer logging.
**Prevention:** Audit all `catchError` blocks in signal stores to ensure they use generic user-facing strings and log the actual exception to the monitoring service.
