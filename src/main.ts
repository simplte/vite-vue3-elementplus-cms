import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setElement, setupComponents } from './plugins/index';

import './styles/main.scss';

const app = createApp(App);
(window as any).global = window;
function bootstrap(app) {
  setElement(app);
  setupComponents(app);

  setupRouter(app);

  router.isReady().then(() => app.mount('#app', true));
}
void bootstrap(app);
