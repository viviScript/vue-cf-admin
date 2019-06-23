import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import '@/styles/index.scss'; // 全局样式

import App from './App';
import store from './store'; // vuex
import router from './router'; // 路由

import '@/icons'; // icon
import '@/config/permission'; // 权限控制
import * as filters from './filters'; // 全局过滤器
/**
 * 如果不想使用mock-server
 * 您希望将MockJs用于模拟api
 * 您可以执行: mockXHR()
 */
import { mockXHR } from '../mock';
// 开发环境开启mock
if (process.env.NODE_ENV === 'development') {
  mockXHR();
}

console.log(process.env.VUE_APP_BASE_API, process.env.NODE_ENV, '当前开发环境');

// 全局定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
