import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 4400,
  },

  plugins: [react(), svgr({}), tsconfigPaths()],
  resolve: {
    alias: {},
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    'process.env.GPT_API_KEY': JSON.stringify(process.env.GPT_API_KEY),
    'process.env.OPEN_AI_ORG_ID': JSON.stringify(process.env.OPEN_AI_ORG_ID),
    'process.env.FIREBASE_API_KEY': JSON.stringify(
      process.env.FIREBASE_API_KEY,
    ),
    'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
      process.env.FIREBASE_AUTH_DOMAIN,
    ),
    'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
      process.env.FIREBASE_PROJECT_ID,
    ),
    'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
      process.env.FIREBASE_STORAGE_BUCKET,
    ),
    'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
      process.env.FIREBASE_MESSAGING_SENDER_ID,
    ),
    'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
    'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(
      process.env.FIREBASE_MEASUREMENT_ID,
    ),
    IS_DEV: JSON.stringify(true),
    // API_URL: JSON.stringify(API_URL),
    APIkey: JSON.stringify(process.env.API_KEY),
    PROJECT: JSON.stringify('frontend'),

    // __IS_DEV__: JSON.stringify(true),
    // __API__: JSON.stringify('http://localhost:8000'),
    // __PROJECT__: JSON.stringify('frontend'),
  },
});
