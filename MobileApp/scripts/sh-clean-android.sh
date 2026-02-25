#!/bin/bash

# Script para limpieza profunda de Android
echo "🧹 Limpiando Android..."

# Obtener el directorio raíz del proyecto
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ -d "android" ]; then
  cd android && ./gradlew clean && cd ..
else
  echo "⚠️ Carpeta 'android' no encontrada. Nada que limpiar."
fi

echo "✅ Limpieza de Android completada."
