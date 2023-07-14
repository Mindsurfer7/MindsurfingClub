import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";
import ThemeSwitcher from "./ThemeSwitcher";

export default {
  title: "shared/ThemeSwitcher",
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
  <ThemeSwitcher {...args} />
);

export const light = Template.bind({});
light.args = {};

export const dark = Template.bind({});
dark.args = {};

dark.decorators = [ThemeDecorator(Theme.dark)];
