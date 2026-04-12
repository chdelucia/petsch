# Bienvenidos

Live: https://petsch.vercel.app/products
<br>

> **IMPORTANT:** No tengo una PR inicial pero si un sistema de releases estrictos donde podeis ver la config Inicial
> aqui en la [release 0.0.19](https://github.com/chdelucia/petsch/releases/tag/v0.0.19)
> o aqui en la [rama directamente](https://github.com/chdelucia/petsch/tree/first-pr)

El desarrollo ha sido parcialmente hecho por IA aqui podeis ver la documentación de su uso:
[Ver el blog de la IA](/IATACORA.md)

<br>

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

Todo el flujo está completamente automatizado y orquestado mediante: [Ver workflow CI](.github/workflows/ci.yml)

- ⚡ **GitHub Actions**
  - Pipeline central de CI/CD
  - Ejecución de validaciones, tests, análisis y despliegues

### 🛡️ Resultado

✔ Calidad garantizada desde el primer commit  
✔ Reglas estrictas de integración continua  
✔ Observabilidad completa del sistema  
✔ Entregas controladas, seguras y reproducibles

<br>

# Arquitectura por Dominios

Arquitectura basada en: https://nx.dev/blog/architecting-angular-applications

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve petshop
```

## 📊 Calidad del Proyecto (SonarCloud)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=bugs)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=coverage)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=chdelucia_petsch&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=chdelucia_petsch)

---
