import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/UI/Button/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ className, short }) => {
  const { t, i18n } = useTranslation();

  const switchLang = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <div>
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(cls.LangSwitcher, {}, [className as string])}
        onClick={switchLang}
      >
        {t(short ? "shortLang" : "language")}
      </Button>
    </div>
  );
};

export default LangSwitcher;
