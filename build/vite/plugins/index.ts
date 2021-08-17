import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import vueJsx from '@vitejs/plugin-vue-jsx';
// 兼容传统浏览器
import legacyPlugin from '@vitejs/plugin-legacy';

export function createVitePlugins(viteEnv, isBuild) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // 必须
    vue(),
    // 必须
    vueJsx(),
    legacyPlugin({
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15',
      ],
    }),
  ];
  return vitePlugins;
}
