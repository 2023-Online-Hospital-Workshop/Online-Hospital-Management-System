<template>
  <el-container>

    <el-header>
      <h4 class="va-h4">
        处方订单管理
      </h4>
    </el-header>

    <el-main>
      <!-- 搜索框 -->
      <div class="search-box">
        <center>
          <va-input v-model="searchKeyword" placeholder="请输入相关信息"></va-input>
          <va-button @click="search">搜索</va-button>
        </center>
      </div>

      <!-- 表格 -->
      <div class="table">
        <va-data-table :items="items" 
        :columns="columns" 
        :filter-method="filterFunction"
        :per-page="pageSize" 
        :current-page="currentPage" 
        :wrapper-size="550" 
        hoverable 
        clickable 
        virtual-scroller
        @filtered="filteredCount=$event.items.length"
        @row:click="rowClicked" 
        >
          <!-- 分页 -->
          <template #bodyAppend>
            <br>
            <tr>
              <td colspan="6">
                <va-pagination 
                v-model="currentPage" 
                :pages="pages" 
                style="justify-content: center" 
                />
              </td>
            </tr>
          </template>
        </va-data-table>
      </div>

      <!-- 弹窗 -->
      <div v-show="showBox">
        <OrderDetail :id="orderId" :type=0 @closeBox="closeBox"></OrderDetail>
      </div>

    </el-main>

  </el-container>
</template>

<script>
import OrderDetail from '../../components/Admin/OrderDetail.vue'
export default {
  components: {
    OrderDetail,
  },

  data() {
    const pageSize = 12;
    const columns = [
      { key: "订单号", label: "订单号" },
      { key: "时间", label: "时间" },
      { key: "就诊人", label: "就诊人" },
      { key: "金额", label: "金额" },
      { key: "状态", label: "状态" },
    ];

    return {
      // 常量
      pageSize,
      columns,

      // 变量
      searchKeyword: "",
      filteredCount: 0,
      currentPage: 1,
      items: [],

      // 弹窗
      showBox: false,
      orderId: 0,
    }
  },

  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.filteredCount / this.pageSize);
    }
  },

  methods: {
    // 点击搜索
    search() {
    },
    // 筛选函数
    filterFunction(source) {
      console.log(source);
      return source.toString().includes(this.searchKeyword);
    },
    // 点击表行
    rowClicked(event) {
      if (this.showBox) return;
      this.orderId = event.itemIndex;
      this.showBox = true;
    },
    // 关闭弹窗，由子组件触发
    closeBox(flag) {
      if (flag) {
        // 向后端申请减少药品数量，同时改变订单状态
      }
      this.showBox = false;
    }
  },

  mounted() {
    // 初始获取items
    this.items = [
      {
        订单号: 19810,
        时间: "2023-07-12 19:19",
        就诊人: "李田所",
        金额: (114.51).toFixed(2),
        状态: "未支付",
      },
      {
        订单号: 65472,
        时间: "2022-03-09 15:31",
        就诊人: "马缇苏",
        金额: (8).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 12306,
        时间: "2021-06-06 09:27",
        就诊人: "王也",
        金额: (99.9).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
      {
        订单号: 54321,
        时间: "2021-03-04 23:22",
        就诊人: "张德川",
        金额: (123.7).toFixed(2),
        状态: "已支付",
      },
    ];
    this.filteredCount = this.items.length;
  },
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  user-select: none;
}

.el-main {
  user-select: none;
}

* {
  font-family: AliRegular;
  /* 应用字体 */
}
</style>

<!--
  1. 前后端交互
  2. 弹窗改成modal
 -->