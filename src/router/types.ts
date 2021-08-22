import { RouteRecordRaw } from 'vue-router';
export interface RouteMeta {
  // 是否隐藏子菜单，设置 true 隐藏时，配合 redirect 重定向默认变成一级菜单
  hideChildrenInMenu?: boolean;
  // 是否隐藏菜单
  hideInMenu?: boolean;
  // 设置图标
  icon?: string;
  // 设置标题
  title?: string;
  // 当前页面，面包屑是否隐藏
  hideBreadcrumb?: boolean;
  // 当设置currentActiveMenu时，侧边栏优先取currentActiveMenu值作为default-active
  currentActiveMenu?: string;
  // 用于排序
  index?: number;
  // 面包屑是否可以点击
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta?: RouteMeta;
  name: string;
}
