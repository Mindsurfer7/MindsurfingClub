import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from 'entities/User/model/selectors/getUsername';
import { NavLink } from 'react-router-dom';
import { userLogout } from 'entities/User/model/slice/userSlice';
import MiniModal from 'shared/UI/MiniModal/MiniModal';

interface navprops {
  className?: string;
}

export const NavBar = memo(({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const username = useSelector(getUsername);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  useEffect(() => {
    if (username) {
      setVisibility(false);
    }
  }, [username]);

  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      {isVisible && <LoginModal isVisible={isVisible} onClose={onCloseModal} />}
      {/* {i should add Button instead of div here} */}
      <div className={cls.links}>
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
      {/* по хорошему весь сей код над выделить в компонентик для шейред слоя + add onblur*/}
      {isLogged && <MiniModal setIsLogged={setIsLogged} />}
    </div>
  );
});
