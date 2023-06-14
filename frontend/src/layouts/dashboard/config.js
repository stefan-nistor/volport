import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import { BriefcaseIcon } from '@heroicons/react/20/solid';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon/>
      </SvgIcon>
    )
  },
  {
  title: 'Timesheet',
    path: '/timesheet',
    icon: (
      <SvgIcon fontSize="small">
        <ClockIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Volunteers',
    path: '/volunteers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Partners',
    path: '/partners',
    icon: (
      <SvgIcon fontSize="small">
        <BriefcaseIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon/>
      </SvgIcon>
    )
  }
];
