import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import vueJsx from '@vitejs/plugin-vue-jsx';
// 兼容传统浏览器
import legacyPlugin from '@vitejs/plugin-legacy';
import { svgBuilder } from '../../svgBuilder';
import { configHmrPlugin } from './hmr';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK: shouldUseMock } = viteEnv;
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
    svgBuilder('./src/assets/svg/'),
  ];
  // 配置 HMR 插件
  !isBuild && vitePlugins.push(configHmrPlugin());
  // vite-plugin-mock
  shouldUseMock && vitePlugins.push(configMockPlugin(isBuild));
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  return vitePlugins;
}
