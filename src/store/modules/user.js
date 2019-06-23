import { api_login, api_logout, api_getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

/*
 * 单一状态树
 * user应用层唯一数据源
 * 所有数据变量前都应加上  vux_  前缀
 * */
const state = {
  vux_token: getToken(), // 用户token
  vux_name: '',
  vux_avatar: ''
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
  // 设置token
  MU_SET_TOKEN: (state, token) => {
    state.vux_token = token;
  },
  // 设置用户名
  MU_SET_NAME: (state, name) => {
    state.vux_name = name;
  },
  // 设置用户头像
  MU_SET_AVATAR: (state, avatar) => {
    state.vux_avatar = avatar;
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
  /**
   * @desc 用户登录
   * @param { string } username 用户名
   * @param { string } password 用户密码
   * */
  ac_login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      // 请求用户登录接口，获取token
      api_login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        commit('MU_SET_TOKEN', data.token);
        setToken(data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  /**
   * @desc 获取用户信息
   * */
  ac_getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      api_getInfo(state.vux_token).then(response => {
        const { data } = response;
        if (!data) {
          reject('Verification failed, please Login again.');
        }
        const { name, avatar } = data;

        commit('MU_SET_NAME', name);
        commit('MU_SET_AVATAR', avatar);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  /**
   * @desc 退出登录
   * */
  ac_logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      api_logout(state.token).then(() => {
        commit('MU_SET_TOKEN', ''); // 清空vuex token
        removeToken(); // 删除本地存储token值
        resetRouter(); // 重置路由
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  /**
   * @desc 重置用户token
   * */
  ac_resetToken({ commit }) {
    return new Promise(resolve => {
      commit('MU_SET_TOKEN', ''); // 清空vuex token
      removeToken(); // 删除本地存储token值
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

