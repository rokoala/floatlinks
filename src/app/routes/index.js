import {
  CustomerHome,
  CustomerLogin,
  CustomerAppointmentDay,
  CustomerAppointmentTime
} from '../views/customer/pages';

const routes = [
  {
    path: '',
    component: CustomerHome
  },
  {
    path: '/login',
    component: CustomerLogin
  },
  {
    path: '/schedule/day',
    component: CustomerAppointmentDay
  },
  {
    path: '/schedule/time',
    component: CustomerAppointmentTime
  }
];

export default routes;
