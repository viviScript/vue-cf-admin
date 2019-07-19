import * as getters from './getters';

/*
 * 单一状态树
 * home应用层唯一数据源
 * 命名空间为 _errorLog
 * 所有数据变量前都应加上  _vux_  前缀
 * */
const state = {
  _vux_logs: []
};
/*
* 模块内部的 mutations
* 私有mutation命名控件前都应加上  _MU_ 前缀
* 第一个参数是模块的局部状态对象: state
* */

/*
* 触发commit方法：命名空间+方法名
* commit('_errorLog/_MU_ADD_ERROR_LOG')*/
const mutations = {
  _MU_ADD_ERROR_LOG: (state, log) => {
    state._vux_logs.push(log);
  },
  _MU_CLEAR_ERROR_LOG: (state) => {
    state._vux_logs.splice(0);
  }
};

/*
 * 模块内部的 action
 * 私有action方法名前都应加上 _ac_ 前缀
 * 局部状态通过 context.state 暴露出来，
 * 根节点状态则为 context.rootState
 * 参数形式为({ state, commit, rootState })
 * */

/*
* 触发dispatch方式： 命名空间+方法名
* dispatch('_errorLog/_ac_addErrorLog')*/
const actions = {
  _ac_addErrorLog({ commit }, log) {
    commit('_MU_ADD_ERROR_LOG', log);
  },
  _ac_clearErrorLog({ commit }) {
    commit('_MU_CLEAR_ERROR_LOG');
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
