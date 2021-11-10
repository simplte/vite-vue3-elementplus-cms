import BasicLayout from '@/layout/BasicLayout.vue';
import { createAsyncComponent } from '@/utils/tools/createAsyncComponent';

import { AppRouteRecordRaw } from '../types';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoRoutes: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    redirect: '/demo/demoPage',
    meta: {
      title: '组件案例',
      icon: 'el-icon-s-management',
    },
    component: BasicLayout,
    children: [
      {
        path: 'table',
        name: 'DemoTable',
        meta: { title: '案例表格' },
        component: createAsyncComponent(() => import('@/views/demo/demoTable.vue')),
      },
      {
        path: 'form',
        name: 'DemoForm',
        meta: { title: '案例表单' },
        component: () => import('@/views/demo/demoForm.vue'),
      },
      {
        path: 'demoPage',
        name: 'DemoIcon',
        meta: { title: '案例图标' },
        component: () => import('@/views/demo/demo.vue'),
      },
    ],
  },
];
