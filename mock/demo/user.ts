import { MockMethod } from 'vite-plugin-mock';
export default [
  // mock userInfo
  {
    url: '/api/v1/userInfo',
    timeout: 200,
    method: 'get',
    response: ({ body }) => {
      console.log('body', body);
      return {
        code: 0,
        message: 'OK',
        data: {
          userName: 'admin',
          headThumb: 'https://lupic.cdn.bcebos.com/20200412/3024701264_14_747_533.jpg',
        },
      };
    },
  },
] as MockMethod[];
