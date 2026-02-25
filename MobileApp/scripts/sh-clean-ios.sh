#!/bin/bash

# Script para limpieza profunda de iOS
echo "🧹 Limpiando iOS..."

# Obtener el directorio raíz del proyecto
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ -d "ios" ]; then
  cd ios
  rm -rf build
  rm -rf Pods
  # Borrar cualquier workspace de Xcode
  rm -rf *.xcworkspace
  pod install
  cd ..
else
  echo "⚠️ Carpeta 'ios' no encontrada. Nada que limpiar."
fi

echo "✅ Limpieza de iOS completada."
