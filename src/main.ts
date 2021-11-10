import './styles/main.scss';

import { createApp } from 'vue';

import App from './App.vue';
import { setupComponents, setupElement } from './plugins/index';
import router, { setupRouter } from './router';
import { setupStore } from './store';
const data = 123;
const app = createApp(App);
(window as any).global = window;
function bootstrap(app) {
  setupElement(app);
  setupComponents(app);
  setupStore(app);
  setupRouter(app);
  router.isReady().then(() => app.mount('#app', true));
}
void bootstrap(app);
