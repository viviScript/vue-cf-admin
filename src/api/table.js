import request from '@/config/request';
/**
 * @description
 * 所有APi接口请求方法都应加上  api_  前缀
 * */

/**
 * @description 用于获取demo信息
 * @param {params} 获取列表
 * */
export function api_getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  });
}
