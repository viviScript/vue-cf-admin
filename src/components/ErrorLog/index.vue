<template>
  <!--  v-if="errorLogs.length>0" -->
  <div>
    <el-badge :value="errorLogs.length" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">Error Log</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column label="time" width="180px">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="type" width="180px">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// import store from './_store';
import { mapGetters } from 'vuex';
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    };
  },
  computed: {
    ...mapGetters({
      errorLogs: '_errorLog/_get_errorLogs'
    })
  },
  watch: {
    dialogTableVisible() {
      console.log(this.errorLogs, '错误');
    }
  },
  created() {
    // this.$store.registerModule('_errorLog', store);
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false;
      this.$store.dispatch('_errorLog/_ac_clearErrorLog');
    }
  }
};
</script>

<style scoped>
  .message-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding-right: 8px;
  }
</style>
