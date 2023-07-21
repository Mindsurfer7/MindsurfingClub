import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'App/providers/ThemeProvider';
import Text, { TextTheme } from './Text';

export default {
  title: 'shared/text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'eorum ipsa omnis in?',
  text: 'lorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
};
export const error = Template.bind({});
error.args = {
  title: 'eorum ipsa omnis in?',
  text: 'lorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
  theme: TextTheme.ERROR,
};

export const title = Template.bind({});
title.args = {
  title: 'eorum ipsa omnis in?',
};
export const text = Template.bind({});
text.args = {
  text: 'eororem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem?',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'eorum ipsa omnis in?',
  text: 'lorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.dark)];

export const titleDark = Template.bind({});
titleDark.args = {
  title: 'eorum ipsa omnis in?',
};
titleDark.decorators = [ThemeDecorator(Theme.dark)];
export const textDark = Template.bind({});
textDark.args = {
  text: 'eororem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem?',
};
textDark.decorators = [ThemeDecorator(Theme.dark)];
