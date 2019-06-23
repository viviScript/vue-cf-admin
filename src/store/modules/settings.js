import defaultSettings from '@/config/settings';

const { fixedHeader, sidebarLogo } = defaultSettings;
/*
 * 单一状态树
 * setting应用层唯一数据源
 * 所有数据变量前都应加上  vux_  前缀
 * */
const state = {
  vux_fixedHeader: fixedHeader, // 是否固定头部菜单
  vux_sidebarLogo: sidebarLogo // 是否显示logo在左侧菜单顶部
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
  MU_CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
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
  // 改变设置
  ac_changeSetting({ commit }, data) {
    commit('MU_CHANGE_SETTING', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

