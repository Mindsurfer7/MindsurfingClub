import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
// import html from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 4400,
  },

  plugins: [
    react(),
    svgr({}),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate', // Или 'prompt'
      manifest: {
        name: 'Mindsurfing Club',
        short_name: 'Mindsurf Club',
        description:
          'Отслеживайте привычки, дела, участвуйте в челленджах и клубах',

        icons: [
          {
            src: '/public/LogoiconsZero.svg', // Путь к вашей SVG-иконке
            sizes: '192x192 512x512 180x180', // Размеры для генерации (можно указать несколько)
            type: 'image/png', // Тип генерируемых иконок
          },
          {
            src: 'manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'apple-icon-180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          // ... остальные иконки (apple-splash) ...
        ],
        start_url: '/PlayerSpace', // Проверьте этот путь!
        scope: '/communities/group/id/challenge/id', // Проверьте этот путь!
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
      },
      workbox: {
        // ... опции Workbox (если нужно) ...
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'robots.txt',
        'manifest-icon-192.maskable.png',
        'manifest-icon-512.maskable.png',
        'favicon-196.png',
        'apple-icon-180.png',
        'apple-splash-1125-2436.jpg',
        'apple-splash-2048-2732.jpg',
        'apple-splash-2732-2048.jpg',
        'apple-splash-1668-2388.jpg',
        'apple-splash-2388-1668.jpg',
        'apple-splash-1536-2048.jpg',
        'apple-splash-2048-1536.jpg',
        'apple-splash-1668-2224.jpg',
        'apple-splash-2224-1668.jpg',
        'apple-splash-1620-2160.jpg',
        'apple-splash-2160-1620.jpg',
        'apple-splash-1290-2796.jpg',
        'apple-splash-2796-1290.jpg',
        'apple-splash-1179-2556.jpg',
        'apple-splash-2556-1179.jpg',
        'apple-splash-1284-2778.jpg',
        'apple-splash-2778-1284.jpg',
        'apple-splash-1170-2532.jpg',
        'apple-splash-2532-1170.jpg',
        'apple-splash-2436-1125.jpg',
        'apple-splash-1242-2688.jpg',
        'apple-splash-2688-1242.jpg',
        'apple-splash-828-1792.jpg',
        'apple-splash-1792-828.jpg',
        'apple-splash-1242-2208.jpg',
        'apple-splash-2208-1242.jpg',
        'apple-splash-750-1334.jpg',
        'apple-splash-1334-750.jpg',
        'apple-splash-640-1136.jpg',
        'apple-splash-1136-640.jpg',
        'mstile-icon-128.png',
        'mstile-icon-270.png',
        'mstile-icon-558.png',
        'mstile-icon-558-270.png',
        // ... другие файлы, которые нужно скопировать ...
      ],
    }),

    // чтобы внедрить яндекс метрику
    // html.createHtmlPlugin({
    //   inject: {
    //     data: {
    //       yandexMetrikaScript: `
    //     <script type="text/javascript">
    //       (function (m, e, t, r, i, k, a) {
    //         m[i] =
    //           m[i] ||
    //           function () {
    //             (m[i].a = m[i].a || []).push(arguments);
    //           };
    //         m[i].l = 1 * new Date();
    //         // ... (остальная часть кода Яндекс.Метрики)
    //       })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    //       ym(97479883, 'init', {
    //         clickmap: true,
    //         trackLinks: true,
    //         accurateTrackBounce: true,
    //         webvisor: true,
    //       });
    //     </script>
    //   `,
    //       noscript: `
    //     <noscript>
    //       <div>
    //         <img
    //           src="https://mc.yandex.ru/watch/97479883"
    //           style="position: absolute; left: -9999px"
    //           alt=""
    //         />
    //       </div>
    //     </noscript>
    //   `,
    //     },
    //   },
    // }),
  ],
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
