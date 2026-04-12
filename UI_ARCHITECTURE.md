# Arquitectura de UI - Atomic Design

Este proyecto utiliza una arquitectura de componentes inspirada en **Atomic Design**, lo que nos permite construir interfaces de usuario de manera modular, escalable y mantenible.

## Estructura de Carpetas

La librería `shared/ui` se organiza conceptualmente (o físicamente) de la siguiente manera:

```text
shared/ui/
├─ atoms
├─ molecules
├─ modules
├─ layouts
├─ pages
```

---

## Niveles de la Arquitectura

### 1. Atoms (Átomos)
Son las piezas fundamentales e indivisibles de nuestra UI. No pueden ser descompuestos en partes menores sin perder su funcionalidad.
- **Ejemplos:** Botones (`ChButton`), inputs, iconos, etiquetas de texto, selectores de idioma (`LanguageSwitcher`).
- **Responsabilidad:** Estilo visual básico y comportamiento elemental.

### 2. Molecules (Moléculas)
Son grupos de átomos unidos que funcionan como una unidad simple. Tienen una responsabilidad única y clara.
- **Ejemplos:** Un campo de búsqueda (input + botón), un elemento de la lista del carrito (`ChCartItem`), la paginación (`ChPagination`).
- **Responsabilidad:** Combinar átomos para crear componentes funcionales más complejos.

### 3. Modules / Organisms (Módulos)
Componentes complejos que forman secciones distintas de la interfaz. Pueden contener moléculas, átomos e incluso otros organismos.
- **Ejemplos:** Tarjeta de producto (`ChProductCard`), lista de productos, filtros avanzados (`ChInputFilter`, `ChDropdownFilter`), cabecera de la lista (`ChProductListHeader`).
- **Responsabilidad:** Gestionar secciones autónomas de la UI que pueden ser reutilizadas en diferentes contextos.

### 4. Layouts (Plantillas)
Definen la estructura de la página y cómo se distribuyen los módulos en ella. Son esencialmente "esqueletos" que determinan dónde van los componentes.
- **Ejemplos:** `ChCartDrawer` (que define el layout lateral del carrito), estructuras de rejilla para el catálogo.
- **Responsabilidad:** Definir el posicionamiento y la disposición visual (esqueleto) sin conocer el contenido final.

### 5. Pages (Páginas)
Son las instancias finales donde los layouts se llenan con datos reales y lógica de negocio.
- **Ejemplos:** Vista de catálogo (`FeaturePage`), Detalle de producto (`FeatureProductDetails`).
- **Responsabilidad:** Orquestar la lógica de negocio, conectarse a los Stores (como `ProductStore`) y renderizar la vista final.

---

## ¿Por qué esta arquitectura?

Hemos decidido adoptar Atomic Design por las siguientes razones:

1.  **Escalabilidad:** Permite que el sistema de diseño crezca de forma organizada. Es fácil saber dónde añadir un nuevo componente.
2.  **Reutilización:** Fomenta la creación de componentes genéricos en los niveles bajos (atoms, molecules) que pueden ser usados en múltiples módulos.
3.  **Consistencia:** Al usar los mismos átomos y moléculas, garantizamos que la experiencia visual sea uniforme en toda la aplicación.
4.  **Mantenibilidad:** Los cambios en un átomo se propagan automáticamente a todas las moléculas y módulos que lo utilizan.
5.  **Storybook Friendly:** Facilita enormemente el desarrollo aislado en Storybook, permitiendo probar cada pieza de forma independiente.

## Ventajas Principales

-   **Separación de Conceptos:** Separa claramente la UI pura (shared/ui) de la lógica de negocio (feature libraries).
-   **Lenguaje Común:** Facilita la comunicación entre diseñadores y desarrolladores al hablar de los mismos componentes modulares.
-   **Facilidad de Testing:** Los componentes más pequeños son extremadamente fáciles de testear unitariamente.
-   **Agilidad en el Desarrollo:** Una vez creada la base de átomos y moléculas, construir nuevas funcionalidades es tan sencillo como ensamblar piezas de LEGO.
