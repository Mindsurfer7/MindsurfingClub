import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/UI/Button/Button";

interface LangSwitcherProps {
  className?: string;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const switchLang = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <div>
      <Button
        theme={ThemeButton.Clear}
        className={classNames(cls.LangSwitcher, {}, [className as string])}
        onClick={switchLang}
      >
        {t("language")}
      </Button>
    </div>
  );
};

export default LangSwitcher;
