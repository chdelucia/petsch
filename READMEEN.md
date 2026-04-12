[Versión en Español](./README.md)

---

Live: https://petsch.vercel.app/

<br>

> **IMPORTANT:** There is no initial PR, but there is a strict release system where you can see the initial configuration  
> here in [release 0.0.19](https://github.com/chdelucia/petsch/releases/tag/v0.0.19)  
> or directly in the [branch](https://github.com/chdelucia/petsch/tree/first-pr)

The development has been partially assisted by AI. You can find documentation about its usage here:  
[View AI logbook](/IATACORA.md)

<br>

# 🧠 Core Idea / General Trade-offs

Strict layer separation to achieve:

- High decoupling
- Scalability
- Testability
- Swappable infrastructure

Cost: higher initial complexity, learning curve, and harder debugging.

- ❌ UI/UX, SEO, and some performance are sacrificed
- ✔️ High modularity, abstraction, and scalability are achieved

<br>

# 🚀 Quality & Delivery Pipeline

From the very first commit, this project follows a **strict and automated workflow** designed to guarantee quality, consistency, and traceability.

Every change goes through the following validation chain:

- 🪝 **Husky pre-commits**
  - Hooks executed before each commit to prevent invalid code

- 🧹 **Linting**
  - Static analysis to enforce code quality standards

- 🧾 **CommitLint**
  - Commit message validation under strict conventions

- 🧪 **Unit Tests**
  - Mandatory unit test execution on every change

- 📊 **SonarQube Analysis**
  - Quality evaluation: bugs, code smells, and coverage

- 🚀 **Release System**
  - Controlled and traceable versioning and deployment

- 📈 **Google Analytics**
  - Usage tracking and behavioral metrics

- 🐞 **Sentry**
  - Real-time error monitoring and tracing

The entire workflow is automated via: [View CI workflow](.github/workflows/ci.yml)

- ⚡ **GitHub Actions**
  - Central CI/CD pipeline
  - Runs validations, tests, analysis, and deployments

### 🛡️ Outcome

✔ Guaranteed quality from the first commit  
✔ Strict continuous integration rules  
✔ Full system observability  
✔ Controlled, safe, and reproducible deliveries

<br>

# Domain Architecture

Architecture based on: https://nx.dev/blog/architecting-angular-applications

A domain-driven modular architecture with strong decoupling and scalability.  
Layer communication is handled through interfaces and dependency injection (injection tokens).

## Structure

```
Domain
├─ api → contracts
├─ data-access → repository implementations (DB/APIs)
├─ feature-* → use cases / application logic
├─ shell → DI container + dependency wiring

shared/ui/ (storybook)
├─ atoms → basic indivisible components (buttons, inputs)
├─ molecules → simple compositions (search field)
├─ organisms → complex UI sections (cards, filters)
```

## Dependency flow and Nx rules

Strict rules are enforced to avoid "spaghetti code" and circular dependencies:

1. A domain can only communicate with others via its `api` library
2. Dependency flow is unidirectional: `shell` → `feature` → `data-access` → `api`
3. `shared/ui` must remain pure and cannot depend on domain libraries

## Data flow

User Action  
→ UI Component  
→ Feature Layer  
→ Signal Store  
→ Data-access  
→ External API  
→ Store updates state  
→ UI reacts via signals

## Signal Store vs classic NgRx

### Advantages of Signal Store

- Lower complexity
- Native Angular 21 integration
- Reactive via signals
- Easier learning curve
- Better granular update performance

### Drawbacks

- Fewer standardized patterns
- Smaller ecosystem
- Requires architectural discipline

## Feature-based stores

Each feature has its own store (no global store)

### Advantages

- Feature isolation
- Horizontal scalability
- Clear ownership

### Drawbacks

- Possible logic duplication
- More initial structure

## FeaturePage as composition root

### Responsibilities

- UI composition
- Event orchestration
- Delegation to store

### Advantages

- Centralized UI flow
- Prevents scattered logic
- Easier testing

### Risks

- Can grow excessively if not controlled

## Injection Tokens

Used to decouple dependencies

### Advantages

- Implementation decoupling
- Easier mocking
- Swappable implementations

### Drawbacks

- Higher initial complexity
- More boilerplate
- Harder debugging

## UI vs Feature UI separation

### Shared UI

- Pure components
- No business state
- Reusable

### Feature UI

- Connected to store
- Contains interaction logic
- Domain-dependent

<br>

# Why this architecture?

These decisions were made for the following reasons:

1. **Horizontal scalability:** Add new domains without impacting existing ones
2. **Maintainability:** Clear responsibilities ease debugging
3. **Reusability:** Shared components and contracts
4. **Testing:** Better isolated and robust tests
5. **Parallel development:** Teams can work independently
6. **Future-proofing:** Plugin-like architecture
7. **Growth:** Easy evolution toward micro frontends (MFE)

## 📊 Project Quality (SonarCloud)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=bugs)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=coverage)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
