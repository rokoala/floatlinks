import { CustomerLayout } from '../views/customer/layout';

import {
  CustomerHome,
  CustomerLogin,
  CustomerProfile,
  CustomerAppointmentDay,
  CustomerAppointmentTime,
  CustomerAppointmentConfirm
} from '../views/customer/pages';

const routes = [
  {
    path: '/',
    exact: true,
    layout: CustomerLayout,
    component: CustomerHome
  },
  {
    path: '/login',
    noLayout: true,
    layout: CustomerLayout,
    component: CustomerLogin
  },
  {
    path: '/profile',
    layout: CustomerLayout,
    component: CustomerProfile
  },
  {
    path: '/schedule/day',
    layout: CustomerLayout,
    component: CustomerAppointmentDay
  },
  {
    path: '/schedule/time',
    layout: CustomerLayout,
    component: CustomerAppointmentTime
  },
  {
    path: '/schedule/confirm',
    layout: CustomerLayout,
    component: CustomerAppointmentConfirm
  }
];

export default routes;
