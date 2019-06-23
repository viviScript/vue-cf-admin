import Cookies from 'js-cookie';
/*
 * 单一状态树
 * app应用层唯一数据源
 * 所有数据变量前都应加上  vux_  前缀
 * */
const state = {
  vux_sidebar: {
    // 左侧菜单收缩或展开状态
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  // 当前设备宽度是否PC
  vux_device: 'desktop'
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
  // 切换左侧菜单收缩展开
  MU_TOGGLE_SIDEBAR: state => {
    state.vux_sidebar.opened = !state.vux_sidebar.opened;
    state.vux_sidebar.withoutAnimation = false;
    if (state.vux_sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  // 关闭蒙版
  MU_CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.vux_sidebar.opened = false;
    state.vux_sidebar.withoutAnimation = withoutAnimation;
  },
  // 切换当前设备运行状态
  MU_TOGGLE_DEVICE: (state, device) => {
    state.vux_device = device;
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
  // 切换左侧菜单栏收缩展开
  ac_toggleSideBar({ commit }) {
    commit('MU_TOGGLE_SIDEBAR');
  },
  // 关闭蒙版
  ac_closeSideBar({ commit }, { withoutAnimation }) {
    commit('MU_CLOSE_SIDEBAR', withoutAnimation);
  },
  // 切换设备状态
  ac_toggleDevice({ commit }, device) {
    commit('MU_TOGGLE_DEVICE', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
