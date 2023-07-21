import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'App/providers/ThemeProvider';
import { NavBar } from './NavBar';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'widget/Navbar',
  component: NavBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const light = Template.bind({});
light.args = {};
light.decorators = [
  StoreDecorator({
    user: { authData: { id: '1', username: 'admin' } },
  }),
];

// export const dark = Template.bind({});
// dark.args = {};
// dark.decorators = [
//   StoreDecorator({
//     user: { authData: { id: '1', username: 'admin' } },
//   }),
// ];

// dark.decorators = [ThemeDecorator(Theme.light)];
