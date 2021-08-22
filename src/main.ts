import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';

const app = createApp(App);
(window as any).global = window;
function bootstrap(app) {
  setupRouter(app);
  router.isReady().then(() => app.mount('#app', true));
}
void bootstrap(app);
