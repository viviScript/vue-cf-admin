import request from '@/config/request';

/**
 * @description
 * 所有APi接口请求方法都应加上  api_  前缀*/

/**
 * @description 登录
 * @param data 用户账号密码
 * */
export function api_login(data) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // });
  return request.post('/user/login', data);
}

/**
 * @description 获取用户信息
 * @param token
 * */
export function api_getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // });
  return request.get('/user/info', { token });
}
/**
 * @description 退出
 * */
export function api_logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // });
  return request.post('/user/logout');
}
