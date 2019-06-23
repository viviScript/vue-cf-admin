import * as types from './mutations-type';

/*
 * 模块内部的 action
 * 私有action方法名前都应加上 _ac_ 前缀
 * 局部状态通过 context.state 暴露出来，
 * 根节点状态则为 context.rootState
 * 参数形式为({ state, commit, rootState })
 * */

/*
* 触发dispatch方式： 命名空间+方法名
* dispatch('_demo/_ac_setValue')*/
export const _ac_setValue = ({ commit }, data) => {
  commit(types._MU_SET_VALUE, data)
};