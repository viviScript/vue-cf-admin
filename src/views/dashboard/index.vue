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
      <el-col :span="12">
        <el-card class="box-card" style="background-color: transparent">
          <div slot="header" class="clearfix">
            <span style="color: #ffffff;">Input</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="普通用法">
              <el-input v-model="form.value1" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="禁用状态">
              <el-input v-model="form.value2" disabled="true" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="可清空">
              <el-input v-model="form.value3" clearable placeholder="请输入" />
            </el-form-item>
            <el-form-item label="密码框">
              <el-input v-model="form.value4" show-password placeholder="请输入" />
            </el-form-item>
            <el-form-item label="带icon的输入框">
              <el-input v-model="form.value5" suffix-icon="el-icon-date" placeholder="请选择日期" />
              <el-input v-model="form.value5" prefix-icon="el-icon-search" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="可适应高度文本域">
              <el-input
                v-model="form.value6"
                type="textarea"
                autosize
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="复合型输入框">
              <el-input v-model="form.value7" placeholder="请输入内容" class="input-with-select">
                <el-select slot="prepend" v-model="select" placeholder="请选择">
                  <el-option label="全部" value="1" />
                </el-select>
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </el-form-item>
            <el-form-item label="输入建议">
              <el-autocomplete
                v-model="state1"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="长度限制">
              <el-input
                v-model="form.value1"
                type="text"
                placeholder="请输入内容"
                maxlength="10"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: ''
      },
      select: 1,
      restaurants: [],
      state1: '',
      state2: ''
    };
  },
  computed: {
    ...mapGetters([
      'get_name'
    ])
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
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
