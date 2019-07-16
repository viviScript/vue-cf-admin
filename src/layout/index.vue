<template>
  <div :class="classObj" class="app-wrapper">
    <!--  判断当前宽度是否是满足PC端，否则开启左侧菜单蒙版  -->
    <div v-if="get_device === 'mobile' && get_sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!--  fixedHeader 是否固定头部菜单   -->
      <div :class="{'fixed-header':get_fixedHeader}">
        <navbar />
        <TagsView />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
// import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  components: {
    Navbar, // 头部导航栏
    Sidebar, // 左侧菜单栏
    AppMain, // 页面渲染主体容器
    TagsView // tags标签导航栏
  },
  mixins: [ResizeMixin],
  computed: {
    // ...mapGetters(['get_sidebar', 'get_device', 'get_fixedHeader']),
    // 获取左侧菜单状态
    get_sidebar() {
      return this.$store.state.app.vux_sidebar;
    },
    // 获取当前设备状态
    get_device() {
      return this.$store.state.app.vux_device;
    },
    // 是否固定头部菜单
    get_fixedHeader() {
      return this.$store.state.settings.vux_fixedHeader;
    },
    // 收缩展开左侧菜单 切换设备状态
    classObj() {
      return {
        hideSidebar: !this.get_sidebar.opened,
        openSidebar: this.get_sidebar.opened,
        withoutAnimation: this.get_sidebar.withoutAnimation,
        mobile: this.get_device === 'mobile'
      };
    }
  },
  methods: {
    // 关闭设备蒙版
    handleClickOutside() {
      this.$store.dispatch('app/ac_closeSideBar', { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixins/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
