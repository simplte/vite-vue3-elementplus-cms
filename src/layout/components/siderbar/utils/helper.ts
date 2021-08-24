import cloneDeep from 'lodash/cloneDeep';

export function resolvePath(menus, parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!menu.path.startsWith('/')) {
      menu.path = `${parentPath}/${menu.path}`;
    }

    if (menu?.children?.length) {
      resolvePath(menu.children, menu.path);
    }
  }

  return menus;
}

export function transformRouteMenu(route, parentPath = '') {
  const cloneRoute = cloneDeep(route);

  // eslint-disable-next-line array-callback-return
  const menuRoute = cloneRoute.filter(function f(item) {
    if (item.component) delete item.component;

    if (item?.meta?.hideChildrenInMenu) item.children = [];

    if (item?.children?.length > 0) {
      item.children = item.children.filter(f);
    }

    if (!item.meta?.hideMenu) return true;
  });

  return resolvePath(menuRoute, parentPath);
}
