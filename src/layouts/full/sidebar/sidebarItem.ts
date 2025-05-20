import {
  DashboardIcon,
  SettingsIcon,
  UserIcon,
  LockIcon,
  SubscriptIcon,
  FormsIcon,
  HistoryIcon,
  ListIcon,
  ListCheckIcon,
  ListDetailsIcon,
  InboxIcon,
  BrandDeliverooIcon,
  GlassFullIcon,
  AwardIcon,
  OutboundIcon,
  ArrowDownIcon,
  StormIcon,
  BoxModelIcon,
  BoxSeamIcon,
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
    title: 'Delivered',
    icon: AwardIcon,
    to: '/delivered',
  },
  {
    title: 'Collection',
    icon: ListDetailsIcon,
    to: '/collection',
  },
  {
    title: 'Inbound',
    icon: ArrowDownIcon,
    to: '/inbound',
  },
  // {
  //   title: 'Outbound',
  //   icon: OutboundIcon,
  //   to: '/outbound',
  // },
  {
    title: 'Inventory',
    icon: StormIcon,
    to: '/inventory',
  },
  {
    title: 'Pending Shelf',
    icon: BoxSeamIcon,
    to: '/pending-shelf',
  },
  {
    title: 'Pending Confirmed NDR',
    icon: BoxSeamIcon,
    to: '/pending-confirmed-ndr',
  },
  {
    title: 'Pending Receive',
    icon: BoxSeamIcon,
    to: '/pending-receive',
  },
  {
    title: 'Delivered By Voucher',
    icon: BoxSeamIcon,
    to: '/delivered-by-voucher',
  },
  {
    title: 'Delivered By Collection Voucher',
    icon: BoxSeamIcon,
    to: '/delivered-by-collection-voucher',
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
