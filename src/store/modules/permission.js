import { constantRoutes } from '@/router';

/**
 * 使用mete来确定当前用户是否具有权限
 * @param roles 权限
 * @param route 路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
/*
 * 单一状态树
 * permission应用层唯一数据源
 * 所有数据变量前都应加上  vux_  前缀
 * */
const state = {
  vux_routes: [], // 路由集合
  vux_addRoutes: [] // 动态路由
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
  // 设置合并路由
  MU_SET_ROUTES(state, routes) {
    state.vux_addRoutes = routes;
    state.vux_routes = constantRoutes.concat(routes);
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
  ac_generateRoutes({ commit }, roles = []) {
    return new Promise(resolve => {
      // let accessedRoutes = []
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('MU_SET_ROUTES', []);
      resolve([]);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
