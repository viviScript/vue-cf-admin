<template>
  <div class="app-container">
    <p style="color: #fff;">基础用法</p>
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <p style="color: #fff;">禁用状态</p>
    <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
    <el-checkbox v-model="checked2" disabled>备选项2</el-checkbox>
    <p style="color: #fff;">多选框组</p>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
      <el-checkbox label="禁用" disabled />
      <el-checkbox label="选中且禁用" disabled />
    </el-checkbox-group>
    <p style="color: #fff;">indeterminate 状态</p>
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;" />
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
    </el-checkbox-group>
    <p style="color: #fff;">按钮样式</p>
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup2" size="medium">
        <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup3" size="small">
        <el-checkbox-button v-for="city in cities" :key="city" :label="city" :disabled="city === '北京'">{{ city }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
        <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <p style="color: #fff;">带有边框</p>
    <div>
      <el-checkbox v-model="checked3" label="备选项1" border />
      <el-checkbox v-model="checked4" label="备选项2" border />
    </div>
    <div style="margin-top: 20px">
      <el-checkbox v-model="checked5" label="备选项1" border size="medium" />
      <el-checkbox v-model="checked6" label="备选项2" border size="medium" />
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup5" size="small">
        <el-checkbox label="备选项1" border />
        <el-checkbox label="备选项2" border disabled />
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
        <el-checkbox label="备选项1" border />
        <el-checkbox label="备选项2" border />
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: 'Checkbox',
  props: {},
  data() {
    return {
      checked: true,
      checked1: false,
      checked2: true,
      checkList: ['选中且禁用', '复选框 A'],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: true,
      checkboxGroup5: [],
      checkboxGroup6: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
