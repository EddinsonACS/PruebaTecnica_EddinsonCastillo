# 📱 MB - Mobile Banking Technical Test

<p align="center">
  <img src="https://img.shields.io/badge/React--Native-0.84.0-blue?style=for-the-badge&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Architecture-Modular-green?style=for-the-badge" alt="Architecture" />
</p>

## 🚀 Overview

This repository contains a professional mobile banking application prototype developed as a **Technical Test** for a **Semi-Senior/Senior React Native Developer** position. The project demonstrates advanced knowledge in React Native, modular architecture, and professional coding standards.

### Key Objectives

- **Modern UI/UX**: Premium design with smooth transitions and professional aesthetics.
- **Scalability**: Decoupled architecture following best practices for financial applications.
- **Type Safety**: Full TypeScript implementation ensures robust data handling and fewer runtime errors.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the React Native development environment configured for iOS and Android.

### 1️⃣ Installation

```bash
npm install
```

### 2️⃣ Environment Check

Validate your local setup:

```bash
npx react-native doctor
```

---

## 📜 Development Scripts

We use custom automation scripts to ensure clean builds and efficient development cycles:

| Script                             | Purpose                                         |
| :--------------------------------- | :---------------------------------------------- |
| `bash scripts/sh-build-android.sh` | 🏗️ Clean build and run on **Android**.          |
| `bash scripts/sh-build-ios.sh`     | 🏗️ Dependency sync (`pods`) and run on **iOS**. |
| `bash scripts/sh-clean-android.sh` | 🧹 Deep purge of Android build artifacts.       |
| `bash scripts/sh-clean-ios.sh`     | 🧹 Deep purge of iOS build artifacts and Pods.  |

---

## 💻 Running the App

### 📱 Android

```bash
npm run android o npx react-native run-android
```

### 🍎 iOS

```bash
npm run ios o npx react-native run-ios
```

---

## 🌐 API Configuration (`ApiConfig.ts`)

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

## 💎 Professional Standards

- **Clean Code**: Zero legacy comments, logs, or debugging artifacts.
- **Unified Design**: Global color system and reusable theme constants.
- **Performance**: Optimized rendering and modular screen management.

---

## 🤝 Acknowledgments

Thank you for the opportunity to demonstrate my technical capabilities through this evaluation.
