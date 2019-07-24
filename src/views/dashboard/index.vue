<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ get_name }}</div>
    <el-row>
      <el-col :span="6">
        <el-card class="box-card" style="width: 300px;background-color: transparent">
          <div slot="header" class="clearfix">
            <span style="color: #ffffff;">Button</span>
          </div>
          <el-row>
            <el-row style="margin-top: 10px;">
              <el-button class="default-btn">默认</el-button>
              <el-button disabled class="default-btn">禁用</el-button>
              <el-button :loading="true" class="default-btn">loading</el-button>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button class="default-btn btn-red">红色</el-button>
              <el-button disabled class="default-btn btn-red">禁用</el-button>
              <el-button :loading="true" class="default-btn btn-red">loading</el-button>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button class="default-btn btn-blue">深蓝</el-button>
              <el-button disabled class="default-btn btn-blue">禁用</el-button>
              <el-button :loading="true" class="default-btn btn-blue">loading</el-button>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button class="default-btn btn-yellow">黄色</el-button>
              <el-button disabled class="default-btn btn-yellow">禁用</el-button>
              <el-button :loading="true" class="default-btn btn-yellow">loading</el-button>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button class="default-btn btn-light">浅蓝</el-button>
              <el-button disabled class="default-btn btn-light">禁用</el-button>
              <el-button :loading="true" class="default-btn btn-light">loading</el-button>
            </el-row>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="width: 300px;background-color: transparent">
          <div slot="header" class="clearfix">
            <span style="color: #ffffff;">Tag</span>
          </div>
          <el-row>
            <el-row style="margin-top: 10px;">
              <el-tag class="default-tag tag-red">一级</el-tag>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-tag class="default-tag tag-dark-yellow">二级</el-tag>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-tag class="default-tag tag-bright-yellow">三级</el-tag>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-tag class="default-tag tag-green">四级</el-tag>
            </el-row>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
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
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
