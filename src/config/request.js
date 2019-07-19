import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui';
import store from '@/store';
import { addErrorLog } from '../components/ErrorLog/error-log';
// import { getToken } from '@/utils/auth'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
/**
 * @description 接口响应拦截
 * @param { Object } response 响应体
 * @param { Boolean } errorTip 是否抛出错误前弹窗提示
 * */
function checkResponse(response, errorTip) {
  const body = response.data;
  const result = body || {};
  // 成功处理
  if (response.code === 200) {
    return result;
  }

  // 错误处理
  let title;
  let errorText;
  if (!body || !body.code || !body.message) {
    title = `返回数据错误 ${response.status}: ${response.url}`;
    errorText = '无效的服务端数据格式';
    Notification.error({
      title,
      message: errorText
    });
  } else {
    title = '提示';
    errorText = result.message;
    if (errorTip && result.code !== 401) {
      Notification.error({
        title,
        message: errorText
      });
    }
  }

  const error = new Error(errorText);
  error.code = result.code || 500;
  error.custom = true;
  error.body = body;
  addErrorLog({
    info: `自定义错误： ${error.code ? `code ${error.code}` : title}`,
    message: error.message,
    stack: error.stack,
    type: 'CustomError'
  });
  throw error;
}
/**
 * @description 登出方法
 * */
function logOut() {
  return MessageBox.confirm('你无权限访问，可以取消继续留在该页面，或者授权后重新登录', '确定登出', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch('user/resetToken').then(() => {
      location.reload();// 为了重新实例化vue-router对象 避免bug
    });
  });
}
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 默认url = base url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时
});

// request interceptor 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  error => {
    // 处理请求错误
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * 如果您想获得http信息，例如头信息或状态信息
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * 通过自定义代码确定请求状态
   * 通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data;
    // 如果响应code不是200，则判断为错误。
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 403 || res.code === 404) {
        // to re-login
        // MessageBox.confirm('您已经注销，您可以取消以停留在此页面，或再次登录', 'Confirm logout', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload();
        //   });
        // });
        logOut();
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log(error, 'request-error'); // for debug
    // addErrorLog({
    //   type: 'requestError',
    //   message: error.message,
    //   url: error.config.url,
    //   stack: error.stack,
    //   info: error.request.status
    // });
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

/**
 * Request请求，return promist
 * @param  {object} [options] 传入Axios Options配置
 * @param  {boolean} [errorTip] errorTip = true 会在抛出错误前弹窗提示
 * @return {object} 响应数据或者err对象
 */
function request(options, { errorTip = true } = {}) {
  return service(options)
  // .then(checkStatus)
    .then(res => checkResponse(res, errorTip))
    .catch(e => {
      // this.$throw(e)
      // console.log(e.response, '错误的响应')
      // console.log(e.message, '错误的信息')
      // console.log(e.custom, '自定义错误')
      if (e.custom) {
        const status = e.code;
        if (status === 401) {
          return logOut();
        }
      } else {
        if (e.response) {
          const status = e.response.status;
          const errorText = codeMessage[e.response.status] || e.response.statusText;
          if (status.toString().substring(0, 1) === '4') {
            console.log('400错误');
            e.errType = 'RequestError';
          } else if (status.toString().substring(0, 1) === '5') {
            e.errType = 'ServiceError';
          }
          // console.log(status.toString().substring(0, 1))
          switch (status) {
            case 400:
              e.type = '请求错误';
              // e.errType = 'RequestError'
              break;
            case 401:
              e.type = '未授权，请登录';
              // e.errType = 'RequestError'
              Notification.error({
                title: `${e.type}: ${e.response.status}: ${e.response.config.url}`,
                message: errorText
              });
              logOut();
              break;
            case 403:
              e.type = '拒绝访问';
              // e.errType = 'RequestError'
              break;
            case 404:
              e.type = `请求地址出错`;
              // e.errType = 'RequestError'
              break;
            case 408:
              e.type = '请求超时';
              // e.errType = 'RequestError'
              break;
            case 500:
              e.type = '服务器内部错误';
              // e.errType = 'ServiceError'
              break;
            case 501:
              e.type = '服务未实现';
              // e.errType = 'ServiceError'
              break;
            case 502:
              e.type = '网关错误';
              // e.errType = 'ServiceError'
              break;
            case 503:
              e.type = '服务不可用';
              // e.errType = 'ServiceError'
              break;
            case 504:
              e.type = '网关超时';
              // e.errType = 'ServiceError'
              break;
            case 505:
              e.type = 'HTTP版本不受支持';
              // e.errType = 'ServiceError'
              break;
            default:
          }
          // if (status === 401) {
          //   return logOut()
          // }
          Notification.error({
            title: `${e.type}: ${e.response.status}: ${e.response.config.url}`,
            message: errorText
          });
          const error1 = new Error(errorText);
          // console.log(error1)
          error1.response1 = e.response;
          console.time('增加日志');
          addErrorLog({
            info: `${e.type}: ${e.response.status}: ${e.response.config.url}`,
            message: e.message,
            stack: e.stack,
            type: e.errType
          });
          console.timeEnd('增加日志');
          throw error1;
        }
      }

      return Promise.reject(e);
    });
}

export default {
  get(url, data, opts) {
    return request(
      {
        url,
        method: 'get',
        params: data
      },
      opts
    );
  },
  post(url, data, opts) {
    return request(
      {
        url,
        method: 'post',
        data
      },
      opts
    );
  },
  put(url, data, opts) {
    return request(
      {
        url,
        method: 'put',
        data
      },
      opts
    );
  },
  patch(url, data, opts) {
    return request(
      {
        url,
        method: 'patch',
        data
      },
      opts
    );
  },
  delete(url, data, opts) {
    return request(
      {
        url,
        method: 'delete',
        params: data
      },
      opts
    );
  }
};

