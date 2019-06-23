/*
 * 单一状态树
 * tagsView应用层唯一数据源
 * 所有数据变量前都应加上  vux_  前缀
 * */
const state = {
  vux_visitedViews: [], // tags标签显示列表
  vux_cachedViews: [] // tags标签缓存列表
};
/**
 * 更改state的唯一方法 提交mutation
 * 接收一个事件类型（type），一个回调函数 回调函数就是进行状态更改的地方
 * 回调函数接收state为第一个参数
 * 可接收第二个参数，可为字符串，对象
 * 一般接收对象类型，对象可包含多个字段
 * mutation提交可直接更改状态
 * mutation通过store.commit()触发
 * mutation命名前都应加上  MU_ 前缀
 * 外部调用commit方法：命名空间+方法名
 * */
const mutations = {
  // 添加tags标签到显示列表
  MU_ADD_VISITED_VIEW: (state, view) => {
    // 判断添加的tags是否已存入显示列表
    if (state.vux_visitedViews.some(v => v.path === view.path)) return;
    // 添加到tags显示列表
    state.vux_visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    );
  },
  // 添加tags标签到缓存列表
  MU_ADD_CACHED_VIEW: (state, view) => {
    // 判断添加的tags是否已存入缓存列表，如有，则不添加
    if (state.vux_cachedViews.includes(view.name)) return;
    // 通过路由中noCache 判断是否需要添加到tags缓存
    if (!view.meta.noCache) {
      state.vux_cachedViews.push(view.name);
    }
  },
  // 从显示列表删除tags标签
  MU_DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.vux_visitedViews.entries()) {
      if (v.path === view.path) {
        state.vux_visitedViews.splice(i, 1);
        break;
      }
    }
  },
  // 从缓存列表删除tags标签
  MU_DEL_CACHED_VIEW: (state, view) => {
    for (const i of state.vux_cachedViews) {
      if (i === view.name) {
        const index = state.vux_cachedViews.indexOf(i);
        state.vux_cachedViews.splice(index, 1);
        break;
      }
    }
  },
  // 从显示列表删除其他tags标签
  MU_DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.vux_visitedViews = state.vux_visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
  },
  // 从缓存列表删除其他tags标签
  MU_DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    for (const i of state.vux_cachedViews) {
      if (i === view.name) {
        const index = state.vux_cachedViews.indexOf(i);
        state.vux_cachedViews = state.vux_cachedViews.slice(index, index + 1);
        break;
      }
    }
  },
  // 从显示列表删除全部tags标签
  MU_DEL_ALL_VISITED_VIEWS: state => {
    // 保存 affix tags标签不删除
    const affixTags = state.vux_visitedViews.filter(tag => tag.meta.affix);
    state.vux_visitedViews = affixTags;
  },
  // 从缓存列表删除全部tags标签
  MU_DEL_ALL_CACHED_VIEWS: state => {
    state.vux_cachedViews = [];
  },
  // 更新显示列表tags标签
  MU_UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.vux_visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
};
/*
 * Action类似mutation 不同在于：
 * Action提交的是mutation，而不是直接更改状态
 * Action可以包含任意异步操作
 * Action接收一个store实例相同的方法和属性的context对象
 * Action可通过context.commit提交一个mutation
 * Action通过store.dispatch()方法触发
 * action方法名前都应加上  ac_ 前缀
 * 外部调用dispatch方法： 命名空间+方法名
 * */
const actions = {
  // 在显示列表 缓存列表同时添加tags标签
  ac_addView({ dispatch }, view) {
    dispatch('ac_addVisitedView', view);
    dispatch('ac_addCachedView', view);
  },
  // 添加tags标签到显示列表
  ac_addVisitedView({ commit }, view) {
    commit('MU_ADD_VISITED_VIEW', view);
  },
  // 添加tags标签到缓存列表
  ac_addCachedView({ commit }, view) {
    commit('MU_ADD_CACHED_VIEW', view);
  },
  // 从显示列表 缓存列表同时删除tags标签
  ac_delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('ac_delVisitedView', view);
      dispatch('ac_delCachedView', view);
      resolve({
        visitedViews: [...state.vux_visitedViews],
        cachedViews: [...state.vux_cachedViews]
      });
    });
  },
  // 从显示列表删除tags标签
  ac_delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('MU_DEL_VISITED_VIEW', view);
      resolve([...state.vux_visitedViews]);
    });
  },
  // 从缓存列表删除tags标签
  ac_delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('MU_DEL_CACHED_VIEW', view);
      resolve([...state.vux_cachedViews]);
    });
  },
  // 从显示列表 缓存列表同时删除其他tags标签
  ac_delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('ac_delOthersVisitedViews', view);
      dispatch('ac_delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.vux_visitedViews],
        cachedViews: [...state.vux_cachedViews]
      });
    });
  },
  // 从显示列表删除其他tags标签
  ac_delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('MU_DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.vux_visitedViews]);
    });
  },
  // 从缓存列表删除其他tags标签
  ac_delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('MU_DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.vux_cachedViews]);
    });
  },
  // 从显示列表 缓存列表删除全部tags标签
  ac_delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('ac_delAllVisitedViews', view);
      dispatch('ac_delAllCachedViews', view);
      resolve({
        visitedViews: [...state.vux_visitedViews],
        cachedViews: [...state.vux_cachedViews]
      });
    });
  },
  // 从显示列表删除全部tags标签
  ac_delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('MU_DEL_ALL_VISITED_VIEWS');
      resolve([...state.vux_visitedViews]);
    });
  },
  // 从缓存列表删除全部tags标签
  ac_delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('MU_DEL_ALL_CACHED_VIEWS');
      resolve([...state.vux_cachedViews]);
    });
  },
  // 更新显示列表tags标签
  ac_updateVisitedView({ commit }, view) {
    commit('MU_UPDATE_VISITED_VIEW', view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
