import { App } from 'vue';
import { createLogger, createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { AppStore, State as AppState, store as app } from '@/store/modules/app';

export interface RootState {
  app: AppState;
}
export type Store = AppStore<Pick<RootState, 'app'>>;
const isDebug = import.meta.env.VITE_NODE_ENV !== 'production';

const plugins = isDebug ? [createLogger()] : [];

// vuex 持久化插件
plugins.push(
  createPersistedState({
    storage: window.sessionStorage,
  })
);

export const store = createStore<RootState>({
  plugins,
  modules: {
    app,
  },
});

export default store;

export function useStore(): Store {
  return store as Store;
}
export function setupStore(app: App<Element>) {
  app.use(store);
}
