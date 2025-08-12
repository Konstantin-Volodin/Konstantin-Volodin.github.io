import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Ensure a stable origin for history.pushState/replaceState
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/'
      }
    },
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'src/**/__tests__/**/*.{ts,tsx}'
    ]
  }
})
