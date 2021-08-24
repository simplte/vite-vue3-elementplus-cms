import './styles/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import router, { setupRouter } from './router';
import { setElement, setupComponents } from './plugins/index';

const app = createApp(App);
(window as any).global = window;
function bootstrap(app) {
  setElement(app);
  setupComponents(app);
  setupStore(app);
  setupRouter(app);

  router.isReady().then(() => app.mount('#app', true));
}
void bootstrap(app);
