import { defineConfig } from 'vite';
import vinext from 'vinext';

export default defineConfig({
  plugins: [
    vinext(),
  ],
  server: {
    port: 3001,
    host: '0.0.0.0'
  }
});
