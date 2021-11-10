import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { App } from 'vue';

export function setupElement(app) {
  app.use(ElementPlus, { locale });
}
