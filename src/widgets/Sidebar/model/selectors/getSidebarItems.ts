/// <reference types="vite-plugin-svgr/client" />
import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import HomeIcon from '../../../../shared/assets/icons/main-20-20.svg?react';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg?react';
import PsyIcon from '../../../../shared/assets/icons/chatGPT.svg?react';
import ProfileIcon from '../../../../shared/assets/icons/profile-20-20.svg?react';
import ArtIcon from '../../../../shared/assets/icons/profile-20-20.svg?react';
import TaskIcon from '../../../../shared/assets/icons/TaskTracker.svg?react';
// import ArtIcon from '../../../../shared/assets/icons/article-20-20.svg?react';
import ClubIcon from '../../../../shared/assets/icons/profile-20-20.svg?react';
// import ClubIcon from '../../../../shared/assets/icons/community.svg?react';
import { SidebarItemType } from '../types/sidebar';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const getSideBarItems = createSelector(getGoogleID, (id) => {
  const SidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.Main,
      Icon: HomeIcon,
      text: 'Home',
    },

    {
      path: RoutePath.PsyRoom,
      Icon: PsyIcon,
      text: 'PsyRoom',
    },
    {
      path: RoutePath.PlayerSpace,
      Icon: TaskIcon,
      text: 'Task Tracker',
    },
    {
      path: RoutePath.Community,
      Icon: ClubIcon,
      text: 'Community',
    },
    {
      path: RoutePath.Profile + id, // userData?.id,
      Icon: ProfileIcon,
      text: 'Profile',
    },
    {
      path: RoutePath.articles,
      Icon: ArtIcon,
      text: 'LongReads',
    },
    {
      path: RoutePath.About,
      Icon: AboutIcon,
      text: 'About',
    },
  ];
  // if (userData) {
  //   SidebarItemsList.push(
  //     {
  //       path: RoutePath.Profile + userData?.id, // userData?.id,
  //       Icon: ProfileIcon,
  //       text: 'Profile',
  //     },
  //     {
  //       path: RoutePath.articles,
  //       Icon: ArtIcon,
  //       text: 'LongReads',
  //     },
  //     {
  //       path: RoutePath.About,
  //       Icon: AboutIcon,
  //       text: 'About',
  //     },
  //   );
  // }
  return SidebarItemsList;
});
