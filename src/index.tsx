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

const firebaseConfig = {
  apiKey: 'AIzaSyBUv1Mfx4lX9uoZ6HYCNSkIC7ytOA2ieWo',
  authDomain: 'advancedfrontend-bb20d.firebaseapp.com',
  projectId: 'advancedfrontend-bb20d',
  storageBucket: 'advancedfrontend-bb20d.appspot.com',
  messagingSenderId: '974266586134',
  appId: '1:974266586134:web:d955abb5679664fcde9137',
  measurementId: 'G-X2WQLYL8B5',
};

const firebaseApp = initializeApp(firebaseConfig);

export const authG = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

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
