import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
// import html from 'vite-plugin-html';

export default defineConfig({
  server: {
    port: 4400,
  },

  plugins: [
    react(),
    svgr({}),
    tsconfigPaths(),

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
