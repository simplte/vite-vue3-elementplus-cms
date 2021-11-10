import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createRouterGuard } from './guard';
import { DefaultRoutes } from './modules/default';
import { DemoRoutes } from './modules/demo';
import { ErrorRoutes } from './modules/error';
import { AppRouteRecordRaw } from './types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const routes: Array<AppRouteRecordRaw> = [...DefaultRoutes, ...DemoRoutes, ...ErrorRoutes];

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
