import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import '@/styles/index.scss'; // 全局样式

import App from './App';
import store from './store'; // vuex
import errorStore from './components/ErrorLog/_store'; // errorLog私有store
import router from './router'; // 路由
import setTheme from './theme'; // 主题配置
import '@/icons'; // icon
import '@/config/permission'; // 权限控制
import * as filters from './filters'; // 全局过滤器
// import getAxios from './config/request';
import './components/ErrorLog/error-capture'; // 全局错误监控

// 全局错误监控，因此需要在入口注册私有store
store.registerModule('_errorLog', errorStore);

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
// 加载默认主题
setTheme('chalk');

console.log({
  '接口路径': process.env.VUE_APP_BASE_API,
  '打包模式': process.env.NODE_ENV,
  '环境变量': process.env.VUE_APP_ENV
});

// 全局定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

// setTimeout(function() {
//   console.error('111');
//   getAxios.post('www.sss.com', {}, { errorTip: false }).then(res => {
//     console.log(res, 'www.sss.com');
//   }).catch(err => {
//     console.log(err, 'www.sss.com');
//   });
//   console.log(obj); // 可以被捕获到，并在onerror中处理
// }, 2000);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
