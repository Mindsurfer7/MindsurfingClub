import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18nForTesting from "shared/config/i18next/i18nForTesting";

export function renderWithTranslation(component: ReactNode) {
  return render(
    <I18nextProvider i18n={i18nForTesting}>{component}</I18nextProvider>
  );
}
