import store from '@/store';
import { getNowFormatDate } from '../../utils/index';

/**
 * @description 新增错误日志
 * @param type 错误类型
 * @param info 错误信息
 * @param message 错误消息
 * @param stack 堆栈信息
 * @param time 时间
 * @param url 错误路径
 * */
export const addErrorLog = function(
  {
    type = '',
    info = '',
    message = '',
    stack = '',
    time = getNowFormatDate(),
    url = window.location.href
  } = {}
) {
  store.dispatch('_errorLog/_ac_addErrorLog', {
    type,
    info,
    message,
    stack,
    time,
    url
  });
};

