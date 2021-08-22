import { Router } from 'vue-router';
import NProgress from 'nprogress';

/**
 * 切换路由时，页面进度条效果
 */
export function createNProgressGuard(router: Router) {
  router.beforeEach(async () => {
    NProgress.start();
    return true;
  });

  router.afterEach(() => {
    NProgress.done();
    return true;
  });
}

/**
 * 路由拦截
 */
export function createRouterGuard(router: Router) {
  createNProgressGuard(router);
}
