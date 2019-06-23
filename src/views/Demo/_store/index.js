import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutations-type';

/*
 * 单一状态树
 * home应用层唯一数据源
 * 命名空间为 _home
 * 所有数据变量前都应加上  _vux_  前缀
 * */
const state = {
  _vux_value: '私有vuex数据'
};
/*
* 模块内部的 mutations
* 私有mutation命名控件前都应加上  _MU_ 前缀
* 第一个参数是模块的局部状态对象: state
* */

/*
* 触发commit方法：命名空间+方法名
* commit('_demo/_mu_set_value')*/
const mutations = {
  [types._MU_SET_VALUE]: (state, value) => {
    state._vux_value = value;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};