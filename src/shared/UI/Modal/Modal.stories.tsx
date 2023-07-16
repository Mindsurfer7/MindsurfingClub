import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";
import Modal from "./Modal";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isVisible: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perferendis repellendus voluptate, alias optio incidunt explicabo sequi expedita labore fugit eligendi consectetur illo, error nesciunt dolorem laborum ipsa omnis in?",
};
export const dark = Template.bind({});
dark.args = {
  isVisible: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perferendis repellendus voluptate, alias optio incidunt explicabo sequi expedita labore fugit eligendi consectetur illo, error nesciunt dolorem laborum ipsa omnis in?",
};
dark.decorators = [ThemeDecorator(Theme.dark)];
