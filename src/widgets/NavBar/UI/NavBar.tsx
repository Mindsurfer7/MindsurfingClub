import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { syncBuiltinESMExports } from "module";
import AppLink, { AppLinkTheme } from "shared/UI/AppLink/AppLink";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import Modal from "shared/UI/Modal/Modal";
import { useCallback, useState } from "react";
import Button, { ButtonTheme } from "shared/UI/Button/Button";

interface navprops {
  className?: string;
}

export const NavBar = ({ className }: navprops) => {
  const [isVisible, setVisibility] = useState(false);

  const onSwitchModal = useCallback(() => {
    setVisibility((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cls.login}
        onClick={onSwitchModal}
      >
        login
      </Button>
      <Modal isVisible={isVisible} onClose={onSwitchModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        perferendis repellendus voluptate, alias optio incidunt explicabo sequi
        expedita labore fugit eligendi consectetur illo, error nesciunt dolorem
        laborum ipsa omnis in?
      </Modal>
      <div className={cls.links}>
        <AppLink
          theme={AppLinkTheme.primary}
          to={"/main"}
          className={cls.mainLink}
        >
          Main
        </AppLink>
      </div>
    </div>
  );
};
