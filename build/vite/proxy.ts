/**
 * 处理开发环境代理地址
 */
import type { ProxyOptions } from 'vite';
type ProxyItem = [string, string];
type ProxyArr = ProxyItem[];
// R Record 定义对象指定的key和value类型
type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>;
const isHttpsRe = /^https:\/\//;
export function createProxy(list: ProxyArr = []) {
  const ret: ProxyTargetList = {};
  // 取到环境变量中设置的代理数据
  for (const [preFix, target] of list) {
    const isHttps = isHttpsRe.test(target);
    ret[preFix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${preFix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
