import { Platform } from 'react-native';

const PHYSICAL_IP = '192.168.1.7';
const IS_PHYSICAL_DEVICE = true; // Cambiar a true cuando pruebes en un dispositivo físico

export const API_BASE_URL = IS_PHYSICAL_DEVICE 
  ? `http://${PHYSICAL_IP}:3002` 
  : Platform.OS === 'android' 
    ? 'http://10.0.2.2:3002' // 10.0.2.2 es el alias especial de Android para apuntar al localhost de la computadora anfitriona
    : 'http://localhost:3002'; // iOS Simulation o Web

export const AUTHOR_ID = '123'; // Standard placeholder, to be updated by user
