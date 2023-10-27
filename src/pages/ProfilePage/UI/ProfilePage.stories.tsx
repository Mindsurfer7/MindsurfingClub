// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'App/providers/ThemeProvider';
// import ProfilePage from './ProfilePage';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

// export default {
//   title: 'pages/Profile',
//   component: ProfilePage,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as ComponentMeta<typeof ProfilePage>;

// const Template: ComponentStory<typeof ProfilePage> = (args) => (
//   <ProfilePage {...args} />
// );

// export const light = Template.bind({});
// light.args = {};
// light.decorators = [
//   StoreDecorator({
//     profile: {
//       form: {
//         username: 'admin',
//         age: '22',
//         city: 'Moscow',
//       },
//     },
//   }),
// ];

// export const dark = Template.bind({});
// dark.args = {};

// dark.decorators = [
//   ThemeDecorator(Theme.dark),
//   StoreDecorator({
//     profile: {
//       form: {
//         username: 'admin',
//         age: '22',
//         city: 'Moscow',
//       },
//     },
//   }),
// ];
