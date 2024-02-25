import { render } from 'react-dom';
import './App/styles/index.scss';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'App/providers/ThemeProvider';
// import { ThemeProvider } from './App/providers/ThemeProvider';
import 'shared/config/i18next/i18n';
import { StoreProvider } from 'App/providers/StoreProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'App/providers/ErrorBoundary';

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

//  СЕЙЧАС Я ХОЧУ ПРИКРУТИТЬ ПРОСМОТРЫ СТАТЕЙ!
//  но надо проверить работает ли вебпа

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker зарегистрирован с областью видимости:',
          registration.scope,
        );
      })
      .catch((error) => {
        console.log('Ошибка при регистрации Service Worker:', error);
      });
  });
}

render(
  <BrowserRouter>
    <StoreProvider>
      {/* <ErrorBoundary> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* </ErrorBoundary> */}
    </StoreProvider>
  </BrowserRouter>,

  document.getElementById('root'),
);
