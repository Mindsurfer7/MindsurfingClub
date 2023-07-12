import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { syncBuiltinESMExports } from "module";
import AppLink, { AppLinkTheme } from "shared/UI/AppLink/AppLink";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

interface navprops {
  className?: string;
}

export const NavBar = ({ className }: navprops) => {
  return (
    <div className={classNames(cls.navbar, {}, [className as string])}>
      <div className={cls.links}>
        <AppLink
          theme={AppLinkTheme.primary}
          to={"/main"}
          className={cls.mainLink}
        >
          Main
        </AppLink>
        <AppLink theme={AppLinkTheme.primary} to={"/about"}>
          About
        </AppLink>
        <AppLink
          theme={AppLinkTheme.primary}
          to={"/psyroom"}
          className={cls.psyroom}
        >
          Psy Room
        </AppLink>
      </div>
    </div>
  );
};
