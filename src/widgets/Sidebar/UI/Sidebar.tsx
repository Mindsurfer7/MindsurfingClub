import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher';
import Button, { ButtonSize, ButtonTheme } from 'shared/UI/Button/Button';
import AppLink, { AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';

import HomeIcon from './../../../shared/assets/icons/main-20-20.svg';
import AboutIcon from './../../../shared/assets/icons/about-20-20.svg';
import PsyIcon from './../../../shared/assets/icons/psy.svg';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapse, setCollapse] = useState(false);

  const onSwitch = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <div
      data-testid={'sidebar'}
      className={classNames(cls.Sidebar, { [cls.collapse]: collapse }, [
        className as string,
      ])}
    >
      <div className={cls.links}>
        <div className={cls.linkWrapper}>
          <AppLink
            theme={AppLinkTheme.primary}
            to={RoutePath.home}
            className={cls.element}
          >
            <HomeIcon className={cls.icon} />
            <span className={cls.link}>Home</span>
          </AppLink>
        </div>
        <div className={cls.linkWrapper}>
          <AppLink
            theme={AppLinkTheme.primary}
            to={RoutePath.about}
            className={cls.element}
          >
            <AboutIcon className={cls.icon} />
            <span className={cls.link}>About</span>
          </AppLink>
        </div>

        <div className={cls.linkWrapper}>
          <AppLink
            theme={AppLinkTheme.primary}
            to={RoutePath.psyroom}
            className={cls.element}
          >
            {' '}
            <PsyIcon className={cls.icon} />
            <span className={cls.link}>Psy Room</span>
          </AppLink>
        </div>
        <Button
          onClick={onSwitch}
          data-testid={'sidebar-btn'}
          className={cls.collapseBtn}
          theme={ButtonTheme.UNCLEAR}
          size={ButtonSize.XL}
          square={true}
        >
          {collapse ? '>' : '<'}
        </Button>
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher className={className} />
        <LangSwitcher short={collapse ? true : false} />
      </div>
    </div>
  );
};

export default Sidebar;
