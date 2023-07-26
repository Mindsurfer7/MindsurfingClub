import { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'App/providers/ThemeProvider';
import { AppRouter } from './providers/Router';
import { NavBar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch } from 'react-redux';
import { initAuthData } from 'entities/User/model/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuthData());
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
