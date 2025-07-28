import {
  DashboardIcon,
  SettingsIcon,
  HistoryIcon,
  ListIcon,
  ListCheckIcon,
  AdIcon,
  LocationIcon,
  UsersIcon,
  MessageIcon,
  BuildingIcon,
  CategoryIcon,
  Category2Icon,
  MenuIcon,
  PackagesIcon
} from 'vue-tabler-icons';
// import { isSuperAdmin } from '@/utils/api';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

// Define all menu items, including those that should be restricted
const allMenuItems: menu[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard',
  },
  {
    title: 'Valuation Requests',
    icon: ListCheckIcon,
    to: '/valuation-requests',
  },

  {
    title: 'Companies',
    icon: ListIcon,
    to: '/companies',
  },
  
  {
    title: 'Guidelines',
    icon: ListIcon,
    to: '/guidelines',
  },

  {
    title: 'Property Types',
    icon: BuildingIcon,
    to: '/property-types',
  },
  {
    title: 'Service Types',
    icon: CategoryIcon,
    to: '/service-types',
  },
  {
    title: 'Property Service Types',
    icon: Category2Icon,
    to: '/property-service-types',
  },
  {
    title: 'Document Requirements',
    icon: MenuIcon,
    to: '/document-requirements',
  },

  {
    title: 'Pricing Rules',
    icon: PackagesIcon,
    to: '/pricing-rules',
  },
  
  
  {
    title: 'Banner Ads',
    icon: AdIcon,
    to: '/banner-ads',
  },

  {
    title: 'Locations',
    icon: LocationIcon,
    to: '/locations',
  },
  {
    title: 'Payments',
    icon: HistoryIcon,
    to: '/payments',
  },

  {
      title: 'Users',
      icon: UsersIcon,
      to: '/users',
    },

    {
      title: 'Chats',
      icon: MessageIcon,
      to: '/chats',
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      to: '/settings',
    },
  
  
];

// Filter the menu items based on the user's role
// const sidebarItem: menu[] = isSuperAdmin()
//   ? allMenuItems // Show all items to super admin
//   : allMenuItems.filter((item: any) =>
//       ['Dashboard', 'Create Quote', 'Quote History'].includes(item.title)
//     );
const sidebarItem: menu[] = allMenuItems;

export default sidebarItem;
