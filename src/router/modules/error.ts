import BlankLayout from '@/layout/BlankLayout.vue';

import { AppRouteRecordRaw } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorRoutes: AppRouteRecordRaw[] = [
  {
    path: '/:path(.*)*',
    name: 'ErrorNotFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue'),
    redirect: '/error/404',
    meta: { title: 'ErrorNotFound', hideMenu: true },
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: BlankLayout,
    meta: { title: 'ErrorPage', hideMenu: true },
    redirect: '/error/404',
    children: [
      {
        path: '403',
        name: 'NotAccess',
        meta: { title: '403' },
        component: () => import(/* webpackChunkName: "403" */ '@/views/error/403.vue'),
      },
      {
        path: '404',
        name: 'NotFound',
        meta: { title: '404' },
        component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue'),
      },
      {
        path: '500',
        name: 'ServiceError',
        meta: { title: '500' },
        component: () => import(/* webpackChunkName: "500" */ '@/views/error/500.vue'),
      },
      {
        path: 'network-error',
        name: 'NetworkError',
        meta: { title: 'NetworkError' },
        component: () =>
          import(/* webpackChunkName: "network-error" */ '@/views/error/NetworkError.vue'),
      },
    ],
  },
];
