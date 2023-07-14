import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";
import { NavBar } from "./NavBar";

export default {
  title: "widget/Navbar",
  component: NavBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const light = Template.bind({});
light.args = {};

export const dark = Template.bind({});
dark.args = {};

dark.decorators = [ThemeDecorator(Theme.dark)];
