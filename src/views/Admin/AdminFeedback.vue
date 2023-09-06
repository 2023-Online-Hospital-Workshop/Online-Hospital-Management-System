<template>
  <el-container>
    <el-main>
      <!-- 条件区 -->
      <div class="conditions">
        <center>
          <va-input v-model="filter" placeholder="请输入相关信息"></va-input>
        </center>
      </div>
      <!-- 条件区 -->

      <!-- 表格区 -->
      <div class="table">
        <va-data-table :items="tableItems" :columns="tableColumns" :filter="filter" :per-page="perPage"
          :current-page="curPage" :wrapper-size="550" hoverable clickable virtual-scroller noDataFilteredHtml="无数据"
          noDataHtml="无数据" @filtered="filteredCount = $event.items.length" @row:click="openModal">

          <!-- 分页 -->
          <template #bodyAppend>
            <br>
            <tr>
              <td colspan="6">
                <va-pagination v-model="curPage" :pages="pages" style="justify-content: center" :visible-pages="10" />
              </td>
            </tr>
          </template>
          <!-- 分页 -->

        </va-data-table>
      </div>
      <!-- 表格区 -->

      <!-- 弹窗 -->
      <div class="modal">
        <va-modal v-model="showModal" title="反馈详情" ok-text="删除" cancel-text="关闭" no-outside-dismiss @ok="deleteItem"
          @cancel="cancel">
          <div style="line-height: 200%;">
            <span style="font-weight: bold;">评分：</span>
            {{ tableItems[selectedRow]["评分"] }}
          </div>
          <div style="line-height: 200%;">
            <span style="font-weight: bold;">评价：</span>
            {{ tableItems[selectedRow]["评价"] }}
          </div>
          <va-data-table :items="modalItems" :columes="modalColumns" sticky-header hoverable
            virtual-scroller striped>
          </va-data-table>
        </va-modal>
      </div>
      <!-- 弹窗 -->

    </el-main>

  </el-container>
</template>

<script>
export default {
  data() {
    const perPage = 12;
    const tableColumns = ["诊断ID", "就诊人ID", "就诊人姓名", "医生ID", "医生姓名", "评分"];

    return {
      // 筛选
      filter: "",
      filteredCount: 0,

      // 表格
      tableColumns,
      tableItems: [],

      // 分页
      perPage,
      curPage: 1,

      //弹窗
      showModal: false,
      selectedRow: 0,
    }
  },

  computed: {
    // 页数
    pages() {
      return Math.ceil(this.filteredCount / this.perPage);
    }
  },

  methods: {
    // 刷新表格
    getTable() {
      fetch("http://124.223.143.21/api/Comment/GetAllFeedbacks", {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          this.tableItems = [];
          for (let i = 0; i < result.length; ++i) {
            this.tableItems.push({
              "诊断ID": result[i].diagnosedid,
              "就诊人ID": result[i].patientId,
              "医生ID": result[i].doctorId,
              "评分": result[i].treatmentScore,
              "评价": result[i].evaluation,
            });
          }
          for (let i = 0; i < this.tableItems.length; ++i) {
            // 获取就诊人姓名
            fetch("http://124.223.143.21/api/Patient/PatientDetails/" + this.tableItems[i]["就诊人ID"], {
              method: 'GET',
              redirect: 'follow'
            }).then(response => response.text())
              .then(result => {
                result = JSON.parse(result);
                this.tableItems[i]["就诊人姓名"] = result[0].name;
              })
              .catch(error => console.log('error', error));

            // 获取医生姓名
            fetch("http://124.223.143.21/api/Doctors/id?id=" + this.tableItems[i]["医生ID"], {
              method: 'GET',
              redirect: 'follow'
            }).then(response => response.text())
              .then(result => {
                result = JSON.parse(result);
                this.tableItems[i]["医生姓名"] = result.name;
              })
              .catch(error => console.log('error', error));
          }
        })
        .catch(error => console.log('error', error));
    },

    // 点击表行
    openModal(event) {
      // 弹窗已弹出则操作无效
      if (this.showModal) {
        return;
      }
      this.showModal = true;
      this.selectedRow = event.itemIndex;
    },

    // 删除反馈评价
    deleteItem() {
      fetch("http://124.223.143.21/api/Comment/DeleteFeedback?diagnosedId="+this.tableItems[this.selectedRow]["诊断ID"], {
        method: 'DELETE',
        redirect: 'follow'
      }).then(response => response.text())
        .then(() => this.getTable())
        .catch(error => console.log('error', error));

      // 关闭弹窗
      this.showModal = false;
    },

    // 取消操作
    cancel() {
      // 关闭弹窗
      this.showModal = false;
    }
  },

  mounted() {
    // 初始化表格和filteredCount
    this.getTable();
    this.filteredCount = this.tableItems.length;
  },

  watch: {
    // 重新筛选时重置curPage
    filter() {
      this.curPage = 1;
    }
  },
}
</script>

<style scoped>
.el-main {
  user-select: none;
}

* {
  /* 应用字体 */
  font-family: AliRegular;
  --va-font-family: AliRegular;
}

.va-data-table {
  --va-font-family: AliRegular;
  /* 表头大小 */
  --va-data-table-thead-font-size: 1rem;
}
</style>

