# 📓 Bitácora de uso de IA en el proyecto

## 📌 Contexto general

La IA se incorporó en una fase avanzada del proyecto, cuando la arquitectura principal, los límites del dominio y las bases de implementación ya estaban sólidamente definidas.

Esto es importante porque condiciona directamente su efectividad: la IA no se utilizó para diseñar el sistema desde cero, sino como apoyo en tareas de desarrollo, refactorización y automatización dentro de un marco ya establecido.

---

## ⚙️ Áreas de uso de la IA

### 🧪 Testing y calidad

- Verificación y corrección de tests (detección de _flaky tasks_ en Nx).
- Creación de mocks para inputs basados en signals en unit tests.
- Generación de `data-test` attributes para e2e y organización de flujos de testing.
- Intentos de aumento de coverage (resultado inconsistente; en algunos casos introdujo dependencias no deseadas como `zone.js`).

---

### 🧩 Arquitectura y componentes

- Migración de componentes a Storybook (resultado correcto).
- Creación de pantallas como **Product Details** respetando la arquitectura existente (funcional, aunque con sobreingeniería en la capa de store).
- Refactorización de componentes para hacerlos más genéricos (resultado incorrecto: rompió Storybook y no respetó el modelo de dominio).
- Adaptación parcial de componentes a signals (correcto funcionalmente, pero con efectos secundarios en estilos y comportamiento de UI).

---

### 🔄 Estado, lógica y navegación

- Implementación de suscripciones a cambios de formularios para sincronizar store (provocó regresiones en filtros de búsqueda).
- Creación de resolvers para rutas de detalle (`getID`) (resultado incorrecto: violación de boundaries arquitecturales).
- Implementación de paginación y filtrado (fallida; se resolvió manualmente).

---

### 🌐 API y dominio

- Adaptación de la API al dominio de PETS (resultado no satisfactorio).
- Generación de lógica de producto basada en arquitectura existente (correcto, pero con sobreingeniería innecesaria).

---

### 🌍 Internacionalización y configuración

- Integración de Transloco (parcialmente fallida: requirió intervención manual y comandos exactos).
- Integración de traducciones en tests unitarios.
- Reemplazo de _magic strings_ por keys de traducción (correcto).

---

### 🖼️ UI y optimización visual

- Implementación de optimización de imágenes con `ngSrc` (correcto, aunque mejorable).
- Detección de mejoras en carga de imágenes (resultado útil sin instrucciones explícitas).
- Refactor de naming en UI para prefijo consistente (`Ch`) (correcto, con revisión manual por olvidos puntuales).
- Intento de unificación de estilos CSS mediante `@apply` (fallido; desconocimiento de configuración del proyecto en algunos casos).

---

## 📊 Resumen de resultados

| Área                     | Resultado                    |
| ------------------------ | ---------------------------- |
| Testing y mocks          | ✅ Útil en general           |
| Storybook y componentes  | ⚠️ Parcial / con regresiones |
| Arquitectura y refactors | ❌ Inconsistente             |
| Estado y routing         | ❌ Problemático              |
| API / dominio            | ⚠️ Parcial                   |
| i18n (Transloco)         | ⚠️ Requiere guía manual      |
| UI / optimización        | ✅ Útil con matices          |
| E2E setup                | ✅ Muy efectivo              |
| Traducciones             | ✅ Correcto                  |

---

## 🧠 Conclusión

El uso de IA en este proyecto ha sido útil como herramienta de aceleración en tareas mecánicas, generación de código repetitivo y apoyo en testing y UI.

Sin embargo, su rendimiento disminuye notablemente en:

- decisiones arquitectónicas
- respeto estricto de boundaries
- consistencia de modelo de dominio
- refactors profundos con impacto transversal

En resumen: la IA ha sido un buen asistente táctico, pero no un agente fiable para decisiones estructurales del sistema. Su mayor valor ha estado en acelerar trabajo conocido, no en definir soluciones nuevas.
