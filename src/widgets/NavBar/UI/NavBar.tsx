import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUsername } from 'entities/User/model/selectors/getUsername';
import { userLogout } from 'entities/User/model/slice/userSlice';
import MiniModal from 'shared/UI/MiniModal/MiniModal';
import { getGoogleData } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
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
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { useTranslation } from 'react-i18next';

interface navprops {
  className?: string;
}

export const PageTitles = {
  [RoutePath[AppRoutes.Main]]: 'Main Page',
  [RoutePath[AppRoutes.Home]]: 'Home Page',
  [RoutePath[AppRoutes.About]]: 'About Us',
  [RoutePath[AppRoutes.PsyRoom]]: 'GPT Psychotherapist',
  [RoutePath[AppRoutes.Profile]]: 'My Profile',
  [RoutePath[AppRoutes.PracticeCenter]]: '',
  [RoutePath[AppRoutes.Conversation]]: 'GPT Psychotherapist',
  [RoutePath[AppRoutes.PlayerSpace]]: 'RPG Task Tracker',
  [RoutePath[AppRoutes.Challenge]]: 'Challenges',
  [RoutePath[AppRoutes.Community]]: 'Community',
  [RoutePath[AppRoutes.NotFound]]: '',
};

export const NavBar = memo(({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [MiniModal2open, setMiniModal2open] = useState(false);
  const username = useSelector(getUsername);
  const googleAcc = useSelector(getGoogleData);
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

  const ulbiLogout = () => {
    dispatch(userLogout());
  };

  const onGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };
  const onGoogleLogout = () => {
    dispatch(logoutWithGoogle());
  };

  useEffect(() => {
    if (username) {
      setVisibility(false);
    }
  }, [username]);

  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      {isVisible && <LoginModal isVisible={isVisible} onClose={onCloseModal} />}
      {showNotify && <NotificationBar />}
      {
        <div className={cls.title}>
          <h1>{t(pageTitle)}</h1>
        </div>
      }
      <div className={cls.links}>
        <div className={cls.notificationsBar} onClick={onOpenNotify}>
          <NotificationIcon />
        </div>

        {!googleAcc?.isLogged ? (
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
            {googleAcc.account?.displayName}
          </Button>
        )}
        {username ? (
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
        )}
      </div>
      {/* по хорошему весь сей код над выделить в компонентик для шейред слоя + add onblur*/}
      {isLogged && (
        <MiniModal setIsLogged={setIsLogged} onLogout={ulbiLogout} />
      )}
      {MiniModal2open && (
        <MiniModal setIsLogged={setMiniModal2open} onLogout={onGoogleLogout} />
      )}
    </div>
  );
});
