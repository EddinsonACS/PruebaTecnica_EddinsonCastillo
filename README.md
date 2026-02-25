# 📱 Movil-BP - Espacio de Trabajo de Prueba Técnica ( Ingeniero Eddinson Castillo)

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/React--Native-Mobile-blue?style=for-the-badge&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-Estricto-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Testing-Jest_100%25-green?style=for-the-badge&logo=jest" alt="Testing" />
</p>

## 🚀 Descripción General

Bienvenido al repositorio **Movil-BP**. Este espacio de trabajo contiene una implementación profesional y robusta desarrollada como evaluación técnica para la posición de Desarrollador Móvil (Senior/Semi-Senior).

El proyecto está estructurado con un enfoque limpio tipo monorepo que contiene dos capas principales: una API ligera de Backend y una Aplicación Móvil con una arquitectura completa y escalable.

---

## 📂 Arquitectura y Estructura del Proyecto

El repositorio está dividido en servicios lógicos y desacoplados:

```text
Movil-BP/
│
├── 📱 MobileApp/           # Frontend en React Native
│   ├── app/                # Enrutador principal y vistas (Screens)
│   ├── components/         # Componentes aislados y reutilizables (Botones, Formularios, Layouts)
│   ├── constants/          # Constantes globales (Colores, Temas, Tipografías)
│   ├── contexts/           # Proveedores de Estado Compartido (Context API)
│   ├── services/           # Lógica de Red e Integraciones de Backend (Fetch, Config)
│   └── __tests__/          # Pruebas Unitarias en Jest (100% de Cobertura)
│
└── ⚙️ backend-simulado/    # API Base (si aplica para la prueba técnica)
```

### 💎 Decisiones Arquitectónicas Clave

- **Modularidad:** La lógica de la interfaz de usuario (UI) está estrictamente separada de los datos de negocio (Paradigma de Servicios).
- **Tema Global y Consistencia:** Una única fuente de verdad para estilos, márgenes y tipografía asegura armonía visual en todas las pantallas.
- **Manejo Robusto de Errores:** Bloques `catch` exhaustivos en las capas de red previenen fallas silenciosas y aseguran una experiencia de usuario (UX) impecable al manejar excepciones.

---

## 🛠️ Instrucciones de Ejecución

Para mantener este espacio limpio, todas las instrucciones específicas sobre cómo instalar las dependencias, configurar el entorno local (React Native CLI) y ejecutar la aplicación en iOS o Android se han documentado dentro del proyecto móvil:

👉 **[Ver Instrucciones de Ejecución (README MobileApp)](./MobileApp/README.md)**

---

## 🧪 Pruebas Unitarias y Calidad del Código (QA)

El profesionalismo se demuestra a través de la confiabilidad. Este proyecto aplica un estándar estricto de pruebas utilizando **Jest**.

Hemos logrado un **100% de Cobertura (Coverage)** en los componentes críticos de negocio como los Servicios de API, asegurando que todas las peticiones de red, escenarios exitosos y excepciones extremas hayan sido evaluadas a fondo.

### Ejecución de las Pruebas

Para verificar la suite de tests, asegúrate de estar dentro del directorio `MobileApp` y ejecuta:

**(A) Correr las pruebas una vez:**

```bash
npm run test
```

**(B) Correr las pruebas interactivamente (Modo Watch):**

```bash
npm run test:watch
```

**(C) Generar Reporte Visual de Cobertura:**

```bash
npm run test:coverage
```

_Este comando generará un panel de control interactivo en formato HTML dentro de la ruta `MobileApp/coverage/lcov-report/index.html`. Puedes abrir este archivo en cualquier navegador web para confirmar visualmente las métricas de seguridad y robustez del código._

---

## ✨ Filosofía de Diseño

- **Cero Tolerancia a la Deuda Técnica:** No existen impresiones residuales en consola (`console.log`), variables sin uso o código legacy comentado.
- **Estética Premium:** Implementación de paradigmas modernos en UI Móvil, priorizando sombras suaves y bordes redondeados (`borderRadius: 24`), con iconografía profesional y consistente provista por `lucide-react-native`.
- **Tipado Estricto (Type Safety):** Integración completa con el Modo Estricto de TypeScript para predecir y anular errores del lado del desarrollador durante el tiempo límite de compilación (compile time), eliminando posibles 'crashes' inesperados para el usuario final.
