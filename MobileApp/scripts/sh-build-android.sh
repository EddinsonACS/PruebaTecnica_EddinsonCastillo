#!/bin/bash

# Script para construir la aplicación en Android
echo "🚀 Iniciando proceso de build para Android..."

# Obtener el directorio raíz del proyecto
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Instalar dependencias si node_modules no existe
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias de Node..."
  npm install
fi

# Regenerar carpeta android si no existe
if [ ! -d "android" ]; then
  echo "⚠️ Carpeta 'android' no encontrada. Regenerando base nativa..."
  TEMP_DIR="temp_rn_init"
  mkdir -p $TEMP_DIR
  
  # Inicializar proyecto temporal para obtener carpetas nativas
  export PATH=$PATH:/usr/local/bin:/usr/local/sbin
  npx @react-native-community/cli init $TEMP_DIR --directory $TEMP_DIR --skip-install --version latest
  
  # Mover carpeta android
  mv $TEMP_DIR/android ./android
  
  # Limpiar temporal
  rm -rf $TEMP_DIR
  echo "✅ Carpeta 'android' restaurada."
fi

# Ejecutar build
echo "🏗️ Compilando Android..."
npm run android
