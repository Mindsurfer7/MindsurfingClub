import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");

  console.log("main page");

  return <div>{t("Main Page")}</div>;
};

export default MainPage;
