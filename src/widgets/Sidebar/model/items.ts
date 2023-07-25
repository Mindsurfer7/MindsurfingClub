import { PsyRoom } from 'pages/PsyRoom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import HomeIcon from './../../../shared/assets/icons/main-20-20.svg';
import AboutIcon from './../../../shared/assets/icons/about-20-20.svg';
import PsyIcon from './../../../shared/assets/icons/psy.svg';
import ProfileIcon from './../../../shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: HomeIcon,
    text: 'Home',
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'About',
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Profile',
  },
  {
    path: RoutePath.psyroom,
    Icon: PsyIcon,
    text: 'PsyRoom',
  },
];
