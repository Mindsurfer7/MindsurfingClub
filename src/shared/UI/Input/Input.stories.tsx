import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'App/providers/ThemeProvider';
import Input from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'true',
  value: 'eorum ipsa omnis in?',
};
export const dark = Template.bind({});
dark.args = {
  placeholder: 'true',
  value: 'eorum ipsa omnis in?',
};
dark.decorators = [ThemeDecorator(Theme.dark)];
