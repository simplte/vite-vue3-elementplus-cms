import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw } from './types';
import { DemoRoutes } from './modules/demo';
import { DefaultRoutes } from './modules/default';

import { createRouterGuard } from './guard';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const routes: Array<AppRouteRecordRaw> = [...DefaultRoutes, ...DemoRoutes];

// eslint-disable-next-line @typescript-eslint/naming-convention
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
});
export function setupRouter(app: App<Element>) {
  app.use(router);
  createRouterGuard(router);
}

export default router;
