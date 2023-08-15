import React, { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher';
import Button, { ButtonSize, ButtonTheme } from 'shared/UI/Button/Button';
import { SidebarItemsList } from '../model/items';
import SidebarItem from './SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = memo(({ className }) => {
  const [collapse, setCollapse] = useState(false);

  const onSwitch = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <div
      data-testid={'sidebar'}
      className={classNames(
        cls.Sidebar,
        { [cls.collapse]: collapse, [cls.expanded]: !collapse },
        [className as string],
      )}
    >
      <div className={cls.links}>
        <div className={cls.linkWrapper}>
          {SidebarItemsList.map((item) => (
            <SidebarItem collapse={collapse} item={item} key={item.text} />
          ))}
        </div>
      </div>

      <div className={cls.switchers}>
        <Button
          onClick={onSwitch}
          data-testid={'sidebar-btn'}
          className={cls.collapseBtn}
          theme={ButtonTheme.CLEAR}
          size={ButtonSize.XL}
          square={true}
        >
          {collapse ? '>' : '<'}
        </Button>
        <ThemeSwitcher className={cls.themeSwitcher} />
        {/* <LangSwitcher short={collapse ? true : false} /> */}
      </div>
    </div>
  );
});

export default Sidebar;
