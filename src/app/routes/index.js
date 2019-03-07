import { CustomerLayout } from '../views/customer/layout';

import {
  CustomerHome,
  CustomerLogin,
  CustomerProfile,
  CustomerAppointmentDay,
  CustomerAppointmentTime,
  CustomerAppointmentConfirm
} from '../views/customer/pages';

import { ServiceProviderLayout } from '../views/serviceProvider/layout';

import {
  ServiceProviderHome,
  ServiceProviderAddCustomer,
  ServiceProviderNextAppointments
} from '../views/serviceProvider/pages';

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
    routePrivate: false,
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
  },
  {
    path: '/admin',
    exact: true,
    routePrivate: false,
    layout: ServiceProviderLayout,
    component: ServiceProviderHome
  },
  {
    path: '/admin/add/customer',
    routePrivate: false,
    layout: ServiceProviderLayout,
    component: ServiceProviderAddCustomer
  },
  {
    path: '/admin/nextAppointments',
    routePrivate: false,
    layout: ServiceProviderLayout,
    component: ServiceProviderNextAppointments
  }
];

export default routes;
