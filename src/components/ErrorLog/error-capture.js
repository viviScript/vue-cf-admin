import Vue from 'vue';
import { addErrorLog } from './error-log';

/**
 * @description vue全局异常捕获
 * @param err error对象，
 * @param vm Vue应用本身
 * @param info Vue特有的字符串
 * */
const errorHandler = function(err, vm, info) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  if (err && vm && info) {
    Vue.nextTick(() => {
      addErrorLog({
        type: 'codeError',
        message: err['message'],
        info: `${vm.$vnode.tag} error in ${info}`,
        stack: err['stack']
      });
      console.log(err, vm, info, 'vue.config.errorHandler');
    });
  } else {
    console.log('没有报错定位，代码循环递归错误');
  }
};
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);

/**
 * @description js运行报错监控
 * @param message 一个字符串，声明了出现的错误的信息(不同的浏览器中返回的消息内容略有差异)。
 * @param url 一个字符串，声明了出现错误的文档的URL。
 * @param lineNo 一个数字，声明了出现错误的代码行的行号。
 * @param columnNo 一个数字，声明了出现错误的代码行的列号。
 * @param error 错误信息
 * */
window.onerror = function(message, url, lineNo, columnNo, error) {
  // 处理error信息
  console.log(message, url, lineNo, columnNo, error, 'js运行报错');
  // addErrorLog({
  //   type: 'windowError',
  //   message: message,
  //   url: url,
  //   stack: error['stack']
  // });
};

/**
 * @description console.error错误监控
 * */
window.console.error = function(e) {
  // console.log(JSON.stringify(e), 'console.Error报错'); // 自定义处理
  // consoleError && consoleError.apply(window, arguments);
  // store.dispatch('_errorLog/_ac_addErrorLog', {
  //   type: 'consoleError',
  //   time: getNowFormatDate(),
  //   message: JSON.stringify(e)
  // });
  addErrorLog({
    type: 'ConsoleError',
    message: JSON.stringify(e)
  });
};

/**
 * @description 前端JS异常监控*/
window.addEventListener('error', event => {
  console.log('addEventListener error:' + event.target);
  addErrorLog({
    type: 'WindowError',
    message: event.message,
    url: event.filename,
    stack: event.error.stack
  });
}, true);
