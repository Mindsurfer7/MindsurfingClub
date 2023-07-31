import { render } from 'react-dom';
import './App/styles/index.scss';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'App/providers/ThemeProvider';
import 'shared/config/i18next/i18n';
import { StoreProvider } from 'App/providers/StoreProvider';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"ff

render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>,

  document.getElementById('root'),
);
