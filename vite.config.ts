import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugins/index';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  // R mode传入当前启动环境 通过viteloadEnv获取环境变量配置
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';
  console.log(env);
  console.log(command);
  const {
    VITE_PORT: port = 3000,
    VITE_PUBLIC_PATH: base = './',
    VITE_PROXY,
    VITE_DROP_CONSOLE,
  } = viteEnv;

  const rollupOptions = {};
  // 依赖预构建 配置vite依赖于编译，缩短项目冷启动时间
  const optimizeDeps = {
    include: ['vue', 'vue-router'],
  };
  // 声明类型别名 vue$ 用于引入vue时精准匹配
  const alias = {
    '@': resolve(__dirname, 'src'),
    '@types': resolve(__dirname, 'types'),
    vue$: 'vue/dist/vue.runtime.esm-bundler.js',
  };
  const proxy = createProxy(VITE_PROXY);
  // jsx 配置
  const esbuild = {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  };

  // vite编译具体执行的操作 https://vitejs.dev/config/#config-file
  return {
    base, // index.html文件所在的位置
    root, // js导入的资源路径，src 引入的位置
    resolve: {
      alias, // 定义路径别名
    },
    // 本地开发服务配置
    server: {
      // 监听所有本地 IP
      host: true,
      port,
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩，boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否阐述maifest.json 文件依赖管理 梳理文件之间的依赖关系
      sourcemap: false, // 是否阐述sourcemap.JSON
      outDir: OUTPUT_DIR || 'dist', // 打包目录
      rollupOptions,
      terserOptions: {
        compress: {
          keep_infinity: true, //防止Infinity被压缩成1/0
          drop_console: VITE_DROP_CONSOLE, // 删除项目中的console
        },
      },
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false,
      // 分隔代码  最大chunk2000kbs
      chunkSizeWarningLimit: 2000,
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    esbuild,
    optimizeDeps,
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {
            hack: `true;@import "src/styles/variables.module.scss";`,
            // ...themeVariables,
          },
          // 就可全局直接使用定义的scss样式了
          additionalData: `@use "src/styles/design/index.scss" as *;`,
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
    // @ts-ignore 客户端类型
    compilerOptions: {
      types: ['node', 'jest', 'vite/client'],
    },
  };
};
