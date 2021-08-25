/**
 * Event Bus for mitt
 * @link https://github.com/developit/mitt
 */
import mitt, { Emitter } from 'mitt';
import { App } from 'vue';

export interface Bus {
  $on: Emitter['on'];
  $off: Emitter['off'];
  $emit: Emitter['emit'];
}

const emitter: Emitter = mitt();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const bus: Bus = {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit,
};

// 暴露一个插件 API
const install = (app: App) => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$bus = bus;
};

export default install;
