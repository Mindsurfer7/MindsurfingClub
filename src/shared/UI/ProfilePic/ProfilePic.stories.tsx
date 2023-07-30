import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'App/providers/ThemeProvider';
import ProfilePic from './ProfilePic';
import pic from '../../assets/ava.jpg';

export default {
  title: 'shared/ProfilePic',
  component: ProfilePic,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePic>;

const Template: ComponentStory<typeof ProfilePic> = (args) => (
  <ProfilePic {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: 150,
  src: pic,
};
