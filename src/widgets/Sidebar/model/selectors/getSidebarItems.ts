import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import HomeIcon from '../../../../shared/assets/icons/main-20-20.svg';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg';
import PsyIcon from '../../../../shared/assets/icons/psy.svg';
import ProfileIcon from '../../../../shared/assets/icons/profile-20-20.svg';
import TaskIcon from '../../../../shared/assets/icons/tasks.svg';
import ArtIcon from '../../../../shared/assets/icons/article-20-20.svg';
import ClubIcon from '../../../../shared/assets/icons/community.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const SidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.Main,
      Icon: HomeIcon,
      text: 'Home',
    },
    {
      path: RoutePath.About,
      Icon: AboutIcon,
      text: 'About',
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
  ];
  if (userData) {
    SidebarItemsList.push(
      {
        path: RoutePath.Profile + userData?.id,
        Icon: ProfileIcon,
        text: 'Profile',
      },
      {
        path: RoutePath.articles,
        Icon: ArtIcon,
        text: 'LongReads',
      },
    );
  }
  return SidebarItemsList;
});
