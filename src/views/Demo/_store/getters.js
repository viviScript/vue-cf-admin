/*
* 模块内部的 getter
* 私有getters值前都应加上  _get_  前缀
* 第一个参数是模块的局部状态对象: state
* 根节点状态会作为第三个参数暴露出来
* 参数形式为：(state, getters, rootState)
* 如果使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter
* 参数形式为：(state, getters, rootState, rootGetters)
* */

/*
* 获取getters方式: 命名空间+方法名
* getters['_demo/_get_getValue']
* */
export const _get_getValue = state => state._vux_value;