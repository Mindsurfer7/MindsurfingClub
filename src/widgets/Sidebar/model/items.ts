import { PsyRoom } from 'pages/PsyRoom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import HomeIcon from './../../../shared/assets/icons/main-20-20.svg';
import AboutIcon from './../../../shared/assets/icons/about-20-20.svg';
import PsyIcon from './../../../shared/assets/icons/psy.svg';
import ProfileIcon from './../../../shared/assets/icons/profile-20-20.svg';
import TaskIcon from './../../../shared/assets/icons/tasks.svg';
import ArtIcon from './../../../shared/assets/icons/article-20-20.svg';
import ClubIcon from './../../../shared/assets/icons/community.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    path: RoutePath.articles,
    Icon: ArtIcon,
    text: 'LongReads',
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
    path: RoutePath.Profile,
    Icon: ProfileIcon,
    text: 'Profile',
  },
];
