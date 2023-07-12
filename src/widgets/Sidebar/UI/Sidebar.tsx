import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";

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
      className={classNames(cls.Sidebar, { [cls.collapse]: collapse }, [
        className as string,
      ])}
    >
      <button onClick={onSwitch}>Switch</button>
      <div className={cls.switchers}>
        <ThemeSwitcher className={className} />
        <LangSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
