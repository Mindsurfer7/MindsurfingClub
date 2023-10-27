import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'App/providers/ThemeProvider';
import ProfileCard from './NewProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = () => <ProfileCard />;

export const Primary = Template.bind({});
Primary.args = {
  profileData: {
    username: 'admin',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
export const error = Template.bind({});
Loading.args = {
  error: 'x',
};
