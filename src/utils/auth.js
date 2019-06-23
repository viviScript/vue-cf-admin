import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';

/**
 * @description 获取用户token
 * */
export function getToken() {
  return Cookies.get(TokenKey);
}
/**
 * @description 存储用户token
 * @param {string} token
 * */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
/**
 * @description 删除用户token
 * */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
