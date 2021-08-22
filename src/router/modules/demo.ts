import { AppRouteRecordRaw } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoRoutes: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/demo/demo.vue'),
  },
];
