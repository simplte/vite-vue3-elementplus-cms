import BasicLayout from '@/layout/BasicLayout.vue';

import { AppRouteRecordRaw } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DefaultRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/',
    component: BasicLayout,
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: '',
        meta: { currentActiveMenu: '/' },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
];
