// 注册全局组件
import { App } from 'vue';
import ElIcon from '@/components/el-icon';

export function setupComponents(app: App) {
  app.component(ElIcon.name, ElIcon);
}
