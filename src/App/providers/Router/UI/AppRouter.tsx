import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { getUserAuthData, getUsername } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Preloader from 'shared/UI/Preloader/Preloader';
import { routeConfig } from 'shared/config/routesConfig/routesConfig';

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData);
  const isAuthG = useSelector(getGoogleIsLogged);

  // const routes = useMemo(() => {
  //   return Object.values(routeConfig).filter((route) => {
  //     if (route.requiresGoogleAuth && !isAuthG) {
  //       return false;
  //     } else if (route.authOnly && !isAuth) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }, [isAuthG, isAuth]);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
      if (route.authOnly && !isAuth) {
        return false;
      }
      return true;
    });
  }, [isAuth]);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {routes.map(({ element, path }) => {
          return (
            <Route
              key={path}
              element={<div className="page-wrapper">{element}</div>}
              path={path}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
