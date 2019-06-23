import router from '../router';
import store from '../store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress配置

const whiteList = ['/login']; // 没有重定向白名单 no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start();

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // 确定用户是否已登录
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.get_name;
      // 判断是否存有用户信息
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/ac_getInfo');
          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/ac_generateRoutes');
          // 动态添加可访问路由
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // 删除token，进入登录页面重新登录
          await store.dispatch('user/ac_resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* 没有token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 在登录白名单，直接跳转
      next();
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
