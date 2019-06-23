import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
Vue.use(Vuex);

// 不需要再重复 `import app from './modules/app'`
// 该代码将所有vuex模块从模块文件导出并合并
const modulesFiles = require.context('./modules', false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

// env里去获取当前的环境是否需要开启严格模式
// 在发布环境开启严格模式会造成性能上不必要的损失
// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules,
  // actions,
  getters
  // strict: debug
});

export default store;
