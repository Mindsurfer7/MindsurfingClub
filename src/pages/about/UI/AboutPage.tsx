import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");
  console.log("about page");

  return <div>{t("description")}</div>;
};

export default AboutPage;
