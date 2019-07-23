<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ get_name }}</div>
    <el-button type="primary">按钮1</el-button>
    <el-button type="success">按钮2</el-button>
    <el-button type="warning">按钮3</el-button>
    <el-button type="danger">按钮4</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'get_name'
    ])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
