## 2026-04-23 - [Privacy/Security] Sentry PII and Search Input Limits
**Vulnerability:** Sentry was configured with `sendDefaultPii: true`, potentially leaking sensitive user data to monitoring logs. Additionally, the search component lacked input length constraints and search history capping, posing risks of unbounded resource growth (DoS/Memory).
**Learning:** Default configurations in third-party libraries (like Sentry) often favor data collection over privacy and must be explicitly audited. UI components handling user-generated lists (like search history) should always have defined bounds.
**Prevention:** Audit all monitoring and tracking initializations for PII collection settings. Implement `maxlength` and collection size limits on all user-controlled inputs and states.
