/*
* mapGetters 辅助函数
* mapGetters方法前都应加上  get_  前缀*/
const getters = {
  get_sidebar: state => state.app.vux_sidebar,
  get_device: state => state.app.vux_device,
  get_token: state => state.user.vux_token,
  get_avatar: state => state.user.vux_avatar,
  get_visitedViews: state => state.tagsView.vux_visitedViews,
  get_name: state => state.user.vux_name,
  get_fixedHeader: state => state.settings.vux_fixedHeader,
  get_sidebarLogo: state => state.settings.vux_sidebarLogo,
  get_routes: state => state.permission.vux_routes
};
export default getters;
