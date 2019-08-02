<template>
  <div class="app-container">
    <p style="color: #fff;">基础用法</p>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <p style="color: #fff;">禁用状态</p>
    <el-radio v-model="radio1" disabled label="禁用">备选项</el-radio>
    <el-radio v-model="radio1" disabled label="选中且禁用">备选项</el-radio>
    <p style="color: #fff;">单选框组</p>
    <el-radio-group v-model="radio2">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
    <p style="color: #fff;">按钮样式</p>
    <div>
      <el-radio-group v-model="radio31">
        <el-radio-button label="上海" />
        <el-radio-button label="北京" />
        <el-radio-button label="广州" />
        <el-radio-button label="深圳" />
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio32" size="medium">
        <el-radio-button label="上海" />
        <el-radio-button label="北京" />
        <el-radio-button label="广州" />
        <el-radio-button label="深圳" />
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio33" size="small">
        <el-radio-button label="上海" />
        <el-radio-button label="北京" disabled />
        <el-radio-button label="广州" />
        <el-radio-button label="深圳" />
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio34" disabled size="mini">
        <el-radio-button label="上海" />
        <el-radio-button label="北京" />
        <el-radio-button label="广州" />
        <el-radio-button label="深圳" />
      </el-radio-group>
    </div>
    <p style="color: #fff;">带有边框</p>
    <div>
      <el-radio v-model="radio41" label="1" border>备选项1</el-radio>
      <el-radio v-model="radio41" label="2" border>备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
      <el-radio v-model="radio42" label="1" border size="medium">备选项1</el-radio>
      <el-radio v-model="radio42" label="2" border size="medium">备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio43" size="small">
        <el-radio label="1" border>备选项1</el-radio>
        <el-radio label="2" border disabled>备选项2</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio44" size="mini" disabled>
        <el-radio label="1" border>备选项1</el-radio>
        <el-radio label="2" border>备选项2</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {},
  data() {
    return {
      radio: '1',
      radio1: '选中且禁用',
      radio2: 3,
      radio31: '上海',
      radio32: '上海',
      radio33: '上海',
      radio34: '上海',
      radio41: '1',
      radio42: '1',
      radio43: '1',
      radio44: '1'
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
