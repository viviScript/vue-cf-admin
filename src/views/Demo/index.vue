<template>
  <div class="demo">
    {{this.getValue}}
    <button @click="getVal">提交commit</button>
  </div>
</template>

<script>
// @ is an alias to /src
import store from './_store';
import { mapGetters } from 'vuex';
import * as types from './_store/mutations-type';
export default {
  name: 'demo',
  data () {
    return {
      val: '1'
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      getValue: '_demo/_get_getValue'
    })
  },
  methods: {
    getVal () {
      this.$store.commit('_demo/' + types._MU_SET_VALUE, 'commit提交home组件私有store');
      this.$store.dispatch('_demo/' +'_ac_setValue', 'action异步commit更新store');
    }
  },
  created() {
    this.$store.registerModule('_demo', store);
  }
}
</script>
<style>
  .demo {
    height: 1000px;
    background: #4AB7BD;
  }
</style>
