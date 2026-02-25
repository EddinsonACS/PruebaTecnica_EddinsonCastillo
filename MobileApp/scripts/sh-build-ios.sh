#!/bin/bash

# Script para construir la aplicación en iOS
echo "🚀 Iniciando proceso de build para iOS..."

# Obtener el directorio raíz del proyecto
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Instalar dependencias si node_modules no existe
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias de Node..."
  npm install
fi

# Regenerar carpeta ios si no existe
if [ ! -d "ios" ]; then
  echo "⚠️ Carpeta 'ios' no encontrada. Regenerando base nativa..."
  TEMP_DIR="temp_rn_init"
  mkdir -p $TEMP_DIR
  
  # Inicializar proyecto temporal para obtener carpetas nativas
  export PATH=$PATH:/usr/local/bin:/usr/local/sbin
  npx @react-native-community/cli init $TEMP_DIR --directory $TEMP_DIR --skip-install --version latest
  
  # Mover carpeta ios
  mv $TEMP_DIR/ios ./ios
  
  # Limpiar temporal
  rm -rf $TEMP_DIR
  echo "✅ Carpeta 'ios' restaurada."
fi

# Asegurar CocoaPods
echo "📦 Verificando CocoaPods..."
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export PATH=$PATH:/usr/local/bin:/usr/local/sbin
cd ios && /usr/local/bin/pod install && cd ..

# Ejecutar build
echo "🏗️ Compilando iOS..."
npm run ios
