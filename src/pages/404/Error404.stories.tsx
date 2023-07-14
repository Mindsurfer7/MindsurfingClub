import { ComponentMeta, ComponentStory } from "@storybook/react";
import Error404 from "./Error404";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "App/providers/ThemeProvider";

export default {
  title: "pages/Error404",
  component: Error404,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Error404>;

const Template: ComponentStory<typeof Error404> = (args) => (
  <Error404 {...args} />
);

export const light = Template.bind({});
light.args = {};

export const dark = Template.bind({});
dark.args = {};

dark.decorators = [ThemeDecorator(Theme.dark)];
