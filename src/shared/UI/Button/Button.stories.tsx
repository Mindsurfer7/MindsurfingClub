import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button, { ThemeButton } from "./Button";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";

export default {
  title: "shared/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "Text",
  theme: ThemeButton.Clear,
};

export const Outline = Template.bind({});
Outline.args = {
  children: "Text",
  theme: ThemeButton.Outline,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: "Text",
  theme: ThemeButton.Outline,
};
OutlineDark.decorators = [ThemeDecorator(Theme.light)];
