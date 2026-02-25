# 📱 MB - Prueba Técnica de Mobile Banking

<p align="center">
  <img src="https://img.shields.io/badge/React--Native-0.84.0-blue?style=for-the-badge&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Arquitectura-Modular-green?style=for-the-badge" alt="Arquitectura" />
</p>

## 🚀 Resumen

Este repositorio contiene un prototipo profesional de una aplicación de banca móvil desarrollado como una **Prueba Técnica** para la posición de **Desarrollador React Native Semi-Senior/Senior**. El proyecto demuestra conocimientos avanzados en React Native, arquitectura modular y estándares de codificación profesionales.

### Objetivos Clave

- **UI/UX Moderna**: Diseño premium con transiciones suaves y estética profesional.
- **Escalabilidad**: Arquitectura desacoplada siguiendo las mejores prácticas para aplicaciones financieras.
- **Seguridad de Tipos**: Implementación completa en TypeScript que asegura un manejo robusto de datos y menos errores en tiempo de ejecución.

---

## 🛠️ Empezando

### Requisitos Previos

Asegúrate de tener el entorno de desarrollo de React Native configurado para iOS y Android.

### 1️⃣ Instalación

```bash
npm install
```

### 2️⃣ Verificación del Entorno

Valida tu configuración local:

```bash
npx react-native doctor
```

---

## 📜 Scripts de Desarrollo

Usamos scripts de automatización personalizados para asegurar builds limpios y ciclos de desarrollo eficientes:

| Script                             | Propósito                                                          |
| :--------------------------------- | :----------------------------------------------------------------- |
| `bash scripts/sh-build-android.sh` | 🏗️ Build limpio y ejecución en **Android**.                        |
| `bash scripts/sh-build-ios.sh`     | 🏗️ Sincronización de dependencias (`pods`) y ejecución en **iOS**. |
| `bash scripts/sh-clean-android.sh` | 🧹 Purga profunda de los artefactos de build de Android.           |
| `bash scripts/sh-clean-ios.sh`     | 🧹 Purga profunda de los artefactos de build de iOS y Pods.        |

---

## 💻 Ejecutando la App

### 📱 Android

```bash
npm run android o npx react-native run-android
```

### 🍎 iOS

```bash
npm run ios o npx react-native run-ios
```

---

## 🌐 Configuración de la API (`ApiConfig.ts`)

Para que la aplicación consuma correctamente la API local, debes configurar `services/ApiConfig.ts` dependiendo de dónde estés corriendo la app:

- **Emulador de iOS o Navegador Web:** Utiliza `http://localhost:3002`.
- **Emulador de Android:** Utiliza `http://10.0.2.2:3002`. (Este alias es necesario porque el emulador es una máquina virtual que usa `localhost` para sí misma).
- **Dispositivo Físico (Android/iOS):** Debes conectar el dispositivo a la misma red Wi-Fi que tu computadora y configurar tu IP de red local (ej. `192.168.1.7`).

En el archivo `ApiConfig.ts`, debes cambiar la variable `IS_PHYSICAL_DEVICE` a `true` cuando uses un celular real:

```typescript
const PHYSICAL_IP = 'Tu_IP_Local';
const IS_PHYSICAL_DEVICE = true; // Cambiar a true cuando pruebes en un dispositivo físico
```

---

## 💎 Estándares Profesionales

- **Código Limpio**: Cero comentarios legacy, logs o artefactos de depuración.
- **Diseño Unificado**: Sistema global de colores y constantes de tema reutilizables.
- **Rendimiento**: Renderizado optimizado y gestión de pantallas modular.

---

## 🤝 Agradecimientos

Gracias por la oportunidad de demostrar mis capacidades técnicas a través de esta evaluación.
