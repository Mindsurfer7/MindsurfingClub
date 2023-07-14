import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";
import AboutPage from "./AboutPage";

export default {
  title: "pages/AboutPage",
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
  //@ts-ignore
  <AboutPage {...args} />
);

export const light = Template.bind({});
light.args = {};

export const dark = Template.bind({});
dark.args = {};

dark.decorators = [ThemeDecorator(Theme.dark)];
