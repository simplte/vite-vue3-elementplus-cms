import { App } from 'vue';
import bus from '@/utils/bus';

export function setupMethods(app: App) {
  app.use(bus);
}
