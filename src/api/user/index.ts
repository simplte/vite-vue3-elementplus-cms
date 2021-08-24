import http from '@/utils/http/index';

enum UserAPI {
  loginIn = '/mock-api/login',
  getUserInfo = '/api/v1/userInfo',
}

// 用户登录
export function loginIn(params: object) {
  return http.post({
    url: '/mock-api/login',
    data: params,
  });
}
/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<any> {
  return http.get({
    url: UserAPI.getUserInfo,
  });
}
