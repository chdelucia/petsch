# Arquitectura del Proyecto

He diseñado este proyecto utilizando un enfoque de Monorepo con **Nx**, siguiendo principios de arquitectura modular y **Atomic Design** para la interfaz de usuario. Mi objetivo es garantizar que la aplicación sea escalable, fácil de mantener y con una clara separación de responsabilidades.

## Estructura de Alto Nivel

He organizado el código en dos carpetas principales:

-   `apps/`: Contiene los puntos de entrada de la aplicación (el "cascarón").
-   `libs/`: Donde reside toda la lógica de negocio, componentes de UI y utilidades, organizadas por dominio.

---

## Arquitectura de Dominios (libs/product, etc.)

Para los dominios de negocio (como `product`), he seguido una estructura inspirada en DDD (Domain-Driven Design) que divide las librerías según su responsabilidad:

### 1. Shell (`shell`)
Es el punto de entrada del dominio. Aquí defino las rutas principales y los guardias. No contiene lógica compleja, solo orquestación de navegación.

### 2. Feature (`feature-*`)
Contiene los casos de uso específicos. Es donde implemento la lógica de la página, conecto los componentes de UI con el estado y gestiono las interacciones del usuario.
- **Ejemplo:** `feature-product-list`, `feature-product-details`.

### 3. Data Access (`data-access`)
Aquí gestiono el estado (usando **NgRx Signal Store**) y las peticiones HTTP. Es el único lugar que conoce cómo comunicarse con el backend o el almacenamiento local.

### 4. API (`api`)
Es la cara pública del dominio. Aquí defino las interfaces, modelos de datos y tokens de inyección que otros dominios pueden consumir sin acoplarse a la implementación interna.

---

## Arquitectura de UI (shared/ui)

Para la interfaz de usuario, he adoptado **Atomic Design** para construir componentes modulares y reutilizables.

### Estructura:
```text
shared/ui/
├─ atoms
├─ molecules
├─ modules
├─ layouts
├─ pages
```

### Mis Niveles de UI:
- **Atoms:** Piezas básicas indivisibles (botones, inputs).
- **Molecules:** Grupos simples de átomos (un campo de búsqueda).
- **Modules (Organisms):** Secciones complejas de la UI (tarjetas de producto, filtros).
- **Layouts:** Estructuras de disposición visual (esqueletos de página, drawers).
- **Pages:** Ensamblaje final donde inyecto la lógica y los datos reales.

---

## Librerías Compartidas (shared)

Además de la UI, he creado librerías transversales:
- **Utils:** Utilidades comunes y configuraciones compartidas.
- **Observability:** Fachada para analíticas (GA) y monitorización de errores (Sentry).

---

## Flujo de Dependencias y Reglas de Nx

He configurado reglas estrictas para evitar el "código espagueti":
1.  Un dominio solo puede comunicarse con otros dominios a través de su librería `api`.
2.  El flujo de dependencia es unidireccional: `shell` → `feature` → `data-access` → `api`.
3.  `shared/ui` no puede depender de ninguna librería de dominio, manteniéndose pura y agnóstica.

---

## ¿Por qué he elegido esta arquitectura?

He tomado estas decisiones por las siguientes ventajas:

1.  **Escalabilidad Horizontal:** Puedo añadir nuevos dominios o funcionalidades sin afectar a las existentes.
2.  **Mantenibilidad:** Al tener responsabilidades tan claras, es fácil localizar y corregir errores.
3.  **Reutilización:** Los componentes en `shared/ui` y las interfaces en `api` son fácilmente reutilizables en toda la aplicación.
4.  **Facilidad de Testing:** Al desacoplar la UI de la lógica y la lógica del acceso a datos, puedo realizar tests unitarios más robustos y aislados.
5.  **Desarrollo en Paralelo:** Varios desarrolladores pueden trabajar en diferentes dominios o niveles de UI sin entrar en conflicto.
