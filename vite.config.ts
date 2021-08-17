import { createVitePlugins } from './build/vite/plugins/index';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    // @ts-ignore 客户端类型
    compilerOptions: {
      types: ['node', 'jest', 'vite/client'],
    },
  };
};
