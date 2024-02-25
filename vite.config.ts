import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// [{},
//     { find: '@', replacement: '/src'
// }],

// const aliases = ['App', 'entities', 'widgets', 'features', 'shared', 'pages'];

export default defineConfig({
  server: {
    port: 4400,
  },
  plugins: [react(), svgr({}), tsconfigPaths()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src/**/*'),
      // '': path.resolve(__dirname, './src/**/*'),
      // App: '/src/App',
      // pages: '/src/pages',
      // entities: '/src/entities',
      // widgets: '/src/widgets',
      // features: '/src/features',
      // shared: '/src/shared',
      // App: path.resolve(__dirname, '/src/App'),
      // pages: path.resolve(__dirname, '/src/pages'),
      // entities: path.resolve(__dirname, '/src/entities'),
      // widgets: path.resolve(__dirname, '/src/widgets'),
      // features: path.resolve(__dirname, '/src/features'),
      // shared: path.resolve(__dirname, '/src/shared'),
      // },
      // alias{
      // : aliases.map((alias) => ({
      //   find: `@${alias}`,
      //   replacement: path.resolve(__dirname, `./src/${alias}`),
      // })),
    },
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

// resolve: {
//   alias: [{ find: '@', replacement: 'hui/src' }],
// },
// resolve: {
//   alias: {
//     '@': path.resolve(__dirname, './src/**/*'),
//     '@entities': path.resolve(__dirname, './src/entities'),
//     widgets: path.resolve(__dirname, './src/widgets'),
//     '@pp': path.resolve(__dirname, './src/App'),
//     features: path.resolve(__dirname, './src/features'),
//     shared: path.resolve(__dirname, './src/shared'),
//   },
// },
//'/entities': path.resolve(__dirname, 'src/entities'),
