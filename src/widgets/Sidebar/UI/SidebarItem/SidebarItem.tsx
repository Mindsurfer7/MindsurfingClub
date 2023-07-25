import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { NavLink } from 'react-router-dom';
import AppLink, { AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import { SidebarItemType } from 'widgets/Sidebar/model/items';

interface SidebarItemProps {
  item: SidebarItemType;
  collapse: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = memo(({ item, collapse }) => {
  return (
    <div className={cls.account}>
      <AppLink
        theme={AppLinkTheme.primary}
        to={item.path}
        className={classNames(cls.element, { [cls.collapse]: collapse })}
      >
        <item.Icon className={cls.icon} />
        <span className={cls.link}>{item.text}</span>
      </AppLink>

      {/* <NavLink to={'/profile'}>
        <div className={'css.WatchList'}>My Account</div>
      </NavLink> */}
    </div>
  );
});

export default SidebarItem;
