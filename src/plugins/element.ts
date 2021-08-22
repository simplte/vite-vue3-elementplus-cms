import { App } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
export function setElement(app: App<Element>) {
  app.use(ElementPlus, { locale });
}
