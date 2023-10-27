import { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'App/providers/ThemeProvider';
import { AppRouter } from './providers/Router';
import { NavBar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initGoogleAuthData, logUserIn } from 'entities/GoogleProfile';
import { onAuthStateChanged } from 'firebase/auth';
import { authG } from './API/firebaseAPI';
import { PROFILE_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  // const inited = useSelector(getUserInited); {inited && <AppRouter />}

  useEffect(() => {
    dispatch(initGoogleAuthData());

    onAuthStateChanged(authG, (user) => {
      if (user) {
        dispatch(logUserIn());
        localStorage.setItem(PROFILE_LOCALSTORAGE_KEY, JSON.stringify(user));
      } else {
        console.log('user logged out');
        localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
      }
    });
  }, []);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <NavBar />

        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
