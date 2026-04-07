# 🐾 Pet Store Frontend

SSR/ SSG se descatar inicialmente como trade-off por tiempo del proyecto.

Voy a utilizar este proyecto para probar vitest y playwright.

## Overview

Arquitectura frontend simplificada basada en:

- Monorepo con Nx
- Angular + Signals para estado
- UI desacoplada con Storybook
- Arquitectura por dominios
- Unit test con vitest
- e2e con playwright

---

## Project Structure

```bash
apps/
  petshop/

libs/
  shared/
    ui/
    analytics/
    monitoring/

  domains/
    product/
    cart/
    checkout/
    user/

  core/
    guards/
```

---

## Domain Structure

Cada dominio sigue esta estructura:

```bash
domain/

  data-access/   # HTTP + adapters + repositories + store
  api/           # expone models + interfaces + tokens
  features/      # casos de uso
  shell/         # routing
```

---

## Catalog Domain

- Uses store (filters + results)
- Filters live here

---

## Cart Domain

- Signal store
- Local persistence

---

## Checkout Domain

- No store
- Local component signals

---

## User Domain

- Simple service with signal
- No store

---

## Shared

```bash
shared/

  ui/
    primitives/
    components/
    patterns/

  analytics/
    analytics.service.ts

  monitoring/
    sentry.service.ts
```

- Global UI (Storybook)
- Cross-cutting concerns

---

## Observability

- Analytics → user behavior events
- Monitoring → error tracking

Initialized globally and used in key features.

---

## Flows

### Add to cart

```ts
catalog feature → cartStore.add()
```

### Checkout

```ts
component → cartStore.items()
           → checkout.repository.createOrder()
```

---

## Tooling

Herramientas para control de pre-commit husky y commintlint

### Nx Boundaries

- api ← data-access ← feature ← shell

Los diferentes dominios solo pueden comunicarse con /api o /shared

```json
{
  "sourceTag": "domain:catalog",
  "onlyDependOnLibsWithTags": ["shared", "domain:catalog"]
}
```

---

## CI Pipeline (GitHub Actions)

Lint, test, e2e, sonar, build.

---

## Delivery Strategy

### Viernes → Setup + Base sólida

Objetivo: tener el proyecto listo para desarrollar sin fricción

#### Setup inicial

- Crear workspace con Nx
- Generar app Angular
- Configurar routing base
- Crear estructura `libs/shared` y `libs/domains`

---

#### Shared UI + Storybook

- Instalar Storybook
- Crear:
- button (primitive)
- input (primitive)
- Crear `product-card` (component)
- Crear `loading-skeleton`

---

#### Tooling (crítico dejarlo hecho ya)

- Instalar Husky
- Configurar `pre-commit`
- Instalar lint-staged
- Configurar ESLint Nx
- Configurar commitlint

---

#### Observabilidad base

- Setup básico de Google Analytics
- Setup básico de Sentry
- Crear `analytics.service.ts`
- Crear `sentry.service.ts`

---

#### CI básica

- Crear GitHub Action

---

#### Resultado viernes

- Proyecto funcional
- UI base
- Tooling listo
- CI inicial
- Monitorización GA y sentry errores
- Despliegue Vercel

---

### Sábado → Catalog + Cart

Objetivo: flujo principal funcionando (ver productos + añadir carrito + filtrar)

---

#### Catalog

##### Data layer

- Crear `catalog.repository.ts`
- Crear adapter (`catalog.adapter.ts`)
- Mock API (si no hay backend)

##### Domain

- Definir `Product`
- Definir `Filters`

##### Store

- Crear `CatalogStore` (signals)
- Implementar:
- loadProducts
- setFilters

##### Feature

- `product-list`
- Integrar:
- product-card
- loading-skeleton

---

#### Cart

##### Store

- Crear `CartStore`
- addItem
- removeItem

##### UI

- Crear `cart-drawer`
- Mostrar items
- Botón “Añadir al carrito”

---

#### Integración

- Conectar catalog → cart

---

#### Analytics (eventos clave)

- track `view_product`
- track `add_to_cart`

---

### Resultado sábado

- Listado de productos funcionando
- Añadir al carrito funcionando
- Eventos trackeados

---

## Domingo → Checkout + cierre

Objetivo: flujo completo end-to-end

---

### Checkout

#### Data

- Crear `checkout.repository.ts`

#### Feature

- Página checkout
- Form:
- dirección
- pago (mock)

#### Lógica

- Leer `cartStore`
- Enviar order
- Limpiar carrito

---

### Analytics

- track `begin_checkout`
- track `purchase`

---

### Sentry

- Capturar errores en checkout
- Añadir interceptor HTTP

---

### Optimización rápida

- Añadir skeletons donde falten
- Lazy load de rutas
- Cache simple en CatalogStore

---

### CI final

- Añadir `nx affected`
- Validar pipeline completo

---

### Documentación

- Subir RFCD al repo
- README básico

---

### Resultado domingo

- Flujo completo (catalog → cart → checkout)
- Observabilidad integrada
- Pipeline completo
- Proyecto entregable

---

## TL;DR ejecución

| Día     | Resultado                      |
| ------- | ------------------------------ |
| Viernes | Infraestructura + UI + tooling |
| Sábado  | Core negocio (catalog + cart)  |
| Domingo | Checkout + cierre + calidad    |
