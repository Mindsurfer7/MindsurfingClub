import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useCallback, useEffect, useState } from 'react';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from 'entities/User/model/selectors/getUsername';
import { NavLink } from 'react-router-dom';
import { userLogout } from 'entities/User/model/slice/userSlice';

interface navprops {
  className?: string;
}

export const NavBar = ({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);
  const onLogout = useCallback(() => {
    dispatch(userLogout());
    setIsLogged(false);
  }, []);

  useEffect(() => {
    if (username) {
      setVisibility(false);
    }
  }, [username]);

  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      {isVisible && <LoginModal isVisible={isVisible} onClose={onCloseModal} />}

      <div className={cls.links}>
        {' '}
        {username ? (
          <div
            className={cls.nickname}
            onClick={() => {
              setIsLogged(!isLogged);
            }}
          >
            {username}
          </div>
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
      {isLogged ? (
        <div className={cls.account}>
          <NavLink to={'/favorites'}>
            <div className={'css.WatchList'}>My Account</div>
          </NavLink>
          <NavLink to={'/tracker'}>
            <div className={'css.WatchList'}>Settings</div>
          </NavLink>
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.login}
            onClick={onLogout}
          >
            logout
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
