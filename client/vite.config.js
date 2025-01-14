import { defineConfig } from 'vite';
import { config } from 'dotenv';
import react from '@vitejs/plugin-react';

config();

export default defineConfig(({ mode }) => {
  console.log(`Current mode: ${mode}`);

  return {
    server: {
      port: process.env.PORT || 5173,
    },
    plugins: [react()],
    // plugins: [MillionLint.vite()],

    envDir: './',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env': {
        ...process.env,
      },
    },
  };
});
