import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";
import AppLink, { AppLinkTheme } from "./AppLink";

export default {
  title: "shared/AppLink",
  component: AppLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
  theme: AppLinkTheme.primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Text",
  theme: AppLinkTheme.secondary,
};

// export const Red = Template.bind({});
// Red.args = {
//     children: 'Text',
//     theme: AppLinkTheme.RED,
// };

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: "Text",
  theme: AppLinkTheme.primary,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.dark)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: "Text",
  theme: AppLinkTheme.secondary,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.dark)];

// export const RedDark = Template.bind({});
// RedDark.args = {
//     children: 'Text',
//     theme: AppLinkTheme.RED,
// };
// RedDark.decorators = [ThemeDecorator(Theme.dark)];
