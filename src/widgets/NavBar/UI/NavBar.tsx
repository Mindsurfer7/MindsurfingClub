import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { syncBuiltinESMExports } from 'module';
import AppLink, { AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import Modal from 'shared/UI/Modal/Modal';
import { useCallback, useState } from 'react';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { LoginModal } from 'features/AuthByUsername';

interface navprops {
  className?: string;
}

export const NavBar = ({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);

  const onCloseModal = useCallback(() => {
    //setVisibility((prev) => !prev);
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    //setVisibility((prev) => !prev);
    setVisibility(true);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      <LoginModal isVisible={isVisible} onClose={onCloseModal} />
      <div className={cls.links}>
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.login}
          onClick={onOpenModal}
        >
          login
        </Button>
      </div>
    </div>
  );
};
