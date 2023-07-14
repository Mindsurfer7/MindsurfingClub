import { addDecorator } from "@storybook/react";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";

import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/styleDecorator.ts";
import { Theme } from "../../src/App/providers/ThemeProvider/index.ts";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.dark));
addDecorator(RouterDecorator);
