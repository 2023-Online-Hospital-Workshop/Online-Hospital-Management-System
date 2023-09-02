<!--  
  问题：
  1. 前后端交互
  2. 表格大小无法适配所有分辨率
  3. 输入框可以添加输入类型限定
  4. sidebar和header和用户端同步
  5. 修改和删除可以添加确认提示
  6. 表格字体大小可以再调整
  7. 坐诊信息应该不包含科室？
  8. 输入ID应该自动生成姓名
  ...
 -->

<template>
  <el-container>

    <el-header>
      <h4 class="va-h4">
        处方订单管理
      </h4>
    </el-header>

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
        <va-data-table :items="tableItems" :columns="tableColumns" :filter="filter" :per-page="perPage" :current-page="curPage"
          :wrapper-size="550" hoverable clickable virtual-scroller @filtered="filteredCount = $event.items.length"
          @row:click="openModal">

          <!-- 分页 -->
          <template #bodyAppend>
            <br>
            <tr>
              <td colspan="6">
                <va-pagination v-model="curPage" :pages="pages" style="justify-content: center" />
              </td>
            </tr>
          </template>
          <!-- 分页 -->

        </va-data-table>
      </div>
      <!-- 表格区 -->

      <!-- 弹窗 -->
      <div class="modal">
        <va-modal v-model="showModal" title="订单详情" ok-text="确认订单" cancel-text="取消操作" no-outside-dismiss @ok="confirm"
          @cancel="cancel">
          <div style="line-height: 200%;">订单号：{{ orderId }}</div>
          <va-data-table :items="modalItems" :columes="modalColumns" :wrapper-size="300" sticky-header hoverable
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
    const tableColumns = ["订单号", "时间", "就诊人", "金额", "状态"];
    const modalColumns = ["药品名", "数量", "金额"];

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
      orderId: "",
      modalColumns,
      modalItems: [],

    }
  },

  computed: {
    // 页数
    pages() {
      return Math.ceil(this.filteredCount / this.perPage);
    }
  },

  methods: {
    // 点击表行
    openModal(event) {
      // 弹窗已弹出则操作无效
      if (this.showModal) {
        return;
      }

      // 从后端获取订单详细信息
      this.orderId = this.tableItems[event.itemIndex]["订单号"];
      this.orderId = "202308310002152896230037";
      fetch("http://124.223.143.21/api/Prescription/GetDetail?prescriptionId="+this.orderId, {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          this.modalItems = [];
          for (let i = 0; i < result.length; ++i) {
            this.modalItems.push({
              "药品名": result[i].medicineName,
              "数量": result[i].quantity,
              "金额": result[i].medicinePrice,
            })
          }
        })
        .catch(error => console.log('error', error));

      // 显示弹窗
      this.showModal = true;
    },

    // 确认订单
    confirm() {
      // 向后端申请减少药品数量，同时改变订单状态
      console.log("confirm");

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
    // 初始获取tableItems/modalItems
    fetch("http://124.223.143.21/api/Prescription/GetAll", {
      method: 'GET',
      redirect: 'follow'
    }).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    for (var i = 0; i < 20; ++i) {
      this.tableItems.push({
        订单号: parseInt(Math.random() * 90000 + 10000).toString(),
        时间: "2023-07-12 19:19",
        就诊人: "李田所",
        金额: (114.514).toFixed(2),
        状态: "未支付",
      })
    }
    for (i = 0; i < 10; ++i) {
      this.modalItems.push({
        药品名: "阿米诺司",
        数量: 2,
        金额: (100.00).toFixed(2),
      })
    }

    // 初始化filteredCount
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
  /* 表头大小 */
  --va-data-table-thead-font-size: 1rem;
}

</style>

