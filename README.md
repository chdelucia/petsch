Live: https://petsch.vercel.app/products

Arquitectura basada en: https://nx.dev/blog/architecting-angular-applications

> **IMPORTANT:** No tengo una PR inicial pero si un sistema de releases estrictos donde podeis ver la config Inicial
> aqui en la [release 0.0.19](https://github.com/chdelucia/petsch/releases/tag/v0.0.19)

# 🧠 Idea clave / Trade-offs generales

Separación estricta por capas para conseguir:

- Alto desacoplamiento
- Escalabilidad
- Testabilidad
- Infraestructura intercambiable

Coste: mayor complejidad inicial y curva de aprendizaje. Además de la dificultat de debugg.

- ❌ Se sacrifica UI/UX, SEO y un poco de performance.

- ✔️ Se consigue una gran modularidad, abstracion y escalabilidad.

<br>

# 🚀 Pipeline de Calidad y Entrega

Desde el primer commit, este proyecto está sometido a un **proceso de trabajo estricto y automatizado** diseñado para garantizar calidad, consistencia y trazabilidad en cada cambio.

Cada cambio pasa por la siguiente cadena de validaciones:

- 🪝 **Husky pre-commits**
  - Hooks ejecutados antes de cada commit para evitar código inválido.

- 🧹 **Linting**
  - Análisis estático del código para mantener estándares de calidad.

- 🧾 **CommitLint**
  - Validación de mensajes de commit bajo convenciones estrictas.

- 🧪 **Unit Tests**
  - Ejecución de pruebas unitarias obligatorias en cada cambio.

- 📊 **SonarQube Analysis**
  - Evaluación de calidad, bugs, code smells y cobertura.

- 🚀 **Sistema de Releases**
  - Versionado y despliegue controlado y trazable.

- 📈 **Google Analytics**
  - Seguimiento de uso, comportamiento y métricas del sistema.

- 🐞 **Sentry**
  - Monitorización de errores en tiempo real y trazabilidad de excepciones.

Todo el flujo está completamente automatizado y orquestado mediante:

- ⚡ **GitHub Actions**
  - Pipeline central de CI/CD
  - Ejecución de validaciones, tests, análisis y despliegues

---

## 🛡️ Resultado

✔ Calidad garantizada desde el primer commit  
✔ Reglas estrictas de integración continua  
✔ Observabilidad completa del sistema  
✔ Entregas controladas, seguras y reproducibles

# Arquitectura por Dominios

Arquitectura modular basada en dominios con alto desacoplamiento y escalabilidad.
La comunicación entre capas se realiza mediante interfaces y dependency injection (injection tokens).

Structure:

```
Domain
├─ api          → contratos
├─ data-access  → implementación de repositorios (DB/APIs)
├─ feature-*    → casos de uso / lógica de aplicación
├─ shell        → DI container + wiring de dependencias

shared/ui/ (storybook)
├─ atoms        → Piezas básicas indivisibles (botones, inputs).
├─ molecules    → Grupos simples de átomos (un campo de búsqueda).
├─ organisms    → Secciones complejas de la UI (tarjetas de producto, filtros).
```

## Flujo de Dependencias y Reglas de Nx

He configurado reglas estrictas para evitar el "código espagueti" y dependencias circulares:

1.  Un dominio solo puede comunicarse con otros dominios a través de su librería `api`.
2.  El flujo de dependencia es unidireccional: `shell` → `feature` → `data-access` → `api`.
3.  `shared/ui` no puede depender de ninguna librería de dominio, manteniéndose pura y agnóstica.

## Flujo de datos

User Action  
→ UI Component  
→ Feature Layer  
→ Signal Store  
→ Data-access  
→ External API  
→ Store updates state  
→ UI reacts via signals

## Signal Store vs NgRx clásico

### Ventajas Signal Store

- Menos complejidad
- Integración nativa en Angular 21
- Reactividad con signals
- Menor curva de aprendizaje
- Mejor performance en updates granulares

### Inconvenientes

- Menos patrones estandarizados
- Ecosistema más pequeño
- Requiere disciplina arquitectural

## Stores por features

Cada feature tiene su propio store (no globales).

### Ventajas

- Aislamiento entre features
- Escalabilidad horizontal
- Ownership claro por feature

### Inconvenientes

- Posible duplicación de lógica
- Más estructura inicial

## FeaturePage como composition root

### Responsabilidades

- Composición de UI
- Orquestación de eventos
- Delegación al store

### Ventajas

- Centraliza flujo de UI
- Evita lógica dispersa
- Facilita testing

### Riesgos

- Puede crecer en exceso si no se controla

## Injection Tokens

Se utilizan para desacoplar dependencias.

### Ventajas

- Desacoplamiento de implementación
- Facilita mocking
- Permite swap de implementaciones

### Inconvenientes

- Más complejidad inicial
- Más boilerplate
- Debug menos directo

## Separación UI vs Feature UI

### UI shared

- Componentes puros
- Sin estado de negocio
- Reutilizables

### Feature UI

- Conectados a store
- Contienen lógica de interacción
- Dependen del dominio

<br>

# ¿Por qué he elegido esta arquitectura?

He tomado estas decisiones por las siguientes ventajas:

1.  **Escalabilidad Horizontal:** Puedo añadir nuevos dominios o funcionalidades sin afectar a las existentes.
2.  **Mantenibilidad:** Al tener responsabilidades tan claras, es fácil localizar y corregir errores.
3.  **Reutilización:** Los componentes en `shared/ui` y las interfaces en `api` son fácilmente reutilizables en toda la aplicación.
4.  **Facilidad de Testing:** Al desacoplar la UI de la lógica y la lógica del acceso a datos, puedo realizar tests unitarios más robustos y aislados.
5.  **Desarrollo en Paralelo:** Varios desarrolladores pueden trabajar en diferentes dominios o niveles de UI sin entrar en conflicto.
6.  **Prevision:** Al estar todo desacoplado si algun dia cambian los servicios no afecta a la arquitectura `plug-in`.
7.  **Crecimiento:** Cualquier dominio es fácil de ser candidato a un MFE al no estar acoplado a la app principal.

## 📊 Calidad del Proyecto (SonarCloud)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=bugs)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=coverage)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)

---
