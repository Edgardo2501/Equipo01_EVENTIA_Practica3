import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Si despliegas en GitHub Pages, actualiza base a '/Equipo01_EVENTIA_Practica3/'
export default defineConfig({
  plugins: [react()],
  base: './',
});
