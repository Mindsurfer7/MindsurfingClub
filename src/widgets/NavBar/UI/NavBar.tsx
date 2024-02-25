import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import MiniModal from 'shared/UI/MiniModal/MiniModal';
import {
  getGoogleData,
  getGoogleIsLogged,
  getGoogleNickname,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import {
  loginWithGoogle,
  logoutWithGoogle,
} from 'features/AuthWithGoogle/model/services/loginWithGoogle';
import {
  AppRoutes,
  RoutePath,
  routeConfig,
} from 'shared/config/routesConfig/routesConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import NotificationBar from 'shared/UI/NotificationBar/NotificationBar';
import NotificationIcon from 'shared/assets/icons/notification.svg?react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/UI/Icon/Icon';
import logo from '../../../../LogoTransparent.svg?react';
interface navprops {
  className?: string;
}

export const PageTitles = {
  [RoutePath[AppRoutes.Main]]: 'Main Page',
  [RoutePath[AppRoutes.Home]]: 'Home Page',
  [RoutePath[AppRoutes.About]]: 'About Us',
  [RoutePath[AppRoutes.PsyRoom]]: 'GPT Assistant',
  [RoutePath[AppRoutes.Profile]]: 'My Profile',
  [RoutePath[AppRoutes.Conversation]]: 'GPT Assistant',
  [RoutePath[AppRoutes.PlayerSpace]]: 'RPG Task Tracker',
  [RoutePath[AppRoutes.Challenge]]: 'Challenges',
  [RoutePath[AppRoutes.Community]]: 'Community',
  [RoutePath[AppRoutes.NotFound]]: '',
};

export const NavBar = memo(({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);
  const [MiniModal2open, setMiniModal2open] = useState(false);
  const isLogged = useSelector(getGoogleIsLogged);
  const nickname = useSelector(getGoogleNickname);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('navbar');
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    const currentRoute = location.pathname as AppRoutes;
    const matchedRoute = Object.entries(routeConfig).find(
      ([key, config]) => config.path === currentRoute,
    );

    setPageTitle(matchedRoute ? PageTitles[currentRoute] : 'Mindsurfing Club');
  }, [location]);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);
  const onOpenNotify = () => {
    setShowNotify(!showNotify);
  };

  // const ulbiLogout = () => {
  //   dispatch(userLogout());
  // };

  const onGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };
  const onGoogleLogout = () => {
    dispatch(logoutWithGoogle());
  };

  // useEffect(() => {
  //   if (username) {
  //     setVisibility(false);
  //   }
  // }, [username]);

  return (
    <header className={classNames(cls.navbar, {}, [className as string])}>
      {showNotify && <NotificationBar />}
      <Icon Svg={logo} className={cls.logo} />
      {
        <div className={cls.title}>
          <h1>{t(pageTitle)}</h1>
        </div>
      }
      <div className={cls.links}>
        <div className={cls.notificationsBar} onClick={onOpenNotify}>
          <Icon Svg={NotificationIcon} className={cls.notificationsBar} />
        </div>

        {!isLogged ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.login}
            onClick={onGoogleLogin}
          >
            {t('login')}
          </Button>
        ) : (
          <Button
            theme={ButtonTheme.OUTLINE}
            //className={cls.nickname}
            onClick={() => {
              setMiniModal2open(!MiniModal2open);
            }}
          >
            {nickname}
          </Button>
        )}
        {/* {username ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            //className={cls.nickname}
            onClick={() => {
              setIsLogged(!isLogged);
            }}
          >
            {username}
          </Button>
        ) : (
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.login}
            onClick={onOpenModal}
          >
            login
          </Button>
        )} */}
      </div>
      {/* по хорошему весь сей код над выделить в компонентик для шейред слоя + add onblur*/}
      {/* {isLogged && (
        <MiniModal setIsLogged={setIsLogged} onLogout={ulbiLogout} />
      )} */}
      {MiniModal2open && (
        <MiniModal setIsLogged={setMiniModal2open} onLogout={onGoogleLogout} />
      )}
    </header>
  );
});
