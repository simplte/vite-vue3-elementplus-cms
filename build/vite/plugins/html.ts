/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite';
import html from 'vite-plugin-html';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';
import pkg from '../../../package.json';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE: appTitle, VITE_PUBLIC_PATH: publicPath } = env;

  const path = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;

  const getAppConfigSrc = () => `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;

  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      injectData: {
        title: appTitle,
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
          {
            tag: 'script',
            attrs: {
              src: getAppConfigSrc(),
            },
          },
        ]
        : [],
    },
  });
  return htmlPlugin;
}
