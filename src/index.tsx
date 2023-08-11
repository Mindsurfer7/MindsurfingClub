import { render } from 'react-dom';
import './App/styles/index.scss';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'App/providers/ThemeProvider';
import 'shared/config/i18next/i18n';
import { StoreProvider } from 'App/providers/StoreProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'App/providers/ErrorBoundary';

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"ff

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,

  document.getElementById('root'),
);
