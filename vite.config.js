import { defineConfig } from "vite";
import { configDefaults } from 'vitest/config'
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias"
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    alias({
      entries: [{
        find: '@',
        replacement: resolve(__dirname, 'client')
      }]
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './client/test/testSetup.js',
    exclude: [
      ...configDefaults.exclude, "./server/**"
    ]
  }
});
