<template>
  <el-container>

    <el-header>
      <h4 class="va-h4">
        药品库存管理
      </h4>
    </el-header>

    <el-main>
      <!-- 切换栏 -->
      <div class="tabs">
        <va-tabs v-model="curTab" grow>
          <template #tabs>
            <va-tab v-for="title in tabTitles" :key="title.id">
              {{ title.name }}
            </va-tab>
          </template>
        </va-tabs>
      </div>
      <!-- 切换栏 -->

      <!-- 条件区 -->
      <div class="conditions">
        <center>
          <span class="search">
            <va-input v-model="filter" placeholder="请输入相关信息"></va-input>
          </span>
          <span v-if="curTab == 0" class="checkbox">
            <va-checkbox v-model="warningOnly" :label="checkboxLabel" />
          </span>
        </center>
      </div>
      <!-- 条件区 -->

      <!-- 表格 -->
      <div class="table">
        <va-data-table :items="tableItems" :columns="tableColumns" :filter-method="filterFunction" :per-page="perPage"
          :current-page="curPage" :wrapper-size="520" hoverable virtual-scroller
          @filtered="filteredCount = $event.items.length">

          <!-- 新建区 -->
          <template v-if="curTab == 0" #headerAppend>
            <tr class="table-curd__slot">
              <th v-for="col in stockColumns.slice(0, -1)" :key="col">
                <va-input v-model="createdItem[col]" :placeholder="col" />
              </th>
              <th>
                <va-input v-model="createdItemWarning" placeholder="预警" readonly />
              </th>
              <th>
                <va-button :disabled="!createdItemValid" block @click="addItem">添加</va-button>
              </th>
            </tr>
          </template>
          <!-- 新建区 -->

          <!-- 修改操作 -->
          <template v-if="curTab == 0" #cell(修改)="{ rowIndex }">
            <va-button preset="plain" icon="edit" @click="openItemEdition(rowIndex)" />
            <va-button preset="plain" icon="delete" class="ml-3" @click="deleteItem(rowIndex)" />
          </template>
          <!-- 修改操作 -->

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
      <!-- 表格 -->

      <!-- 弹窗 -->
      <va-modal v-model="showModal" title="编辑" ok-text="确认" cancel-text="取消" no-outside-dismiss
        @ok="confirmUpdate" @cancel="cancelUpdate">
        <div class="modal-label">库存</div>
        <va-input v-model="editedStock" />
      </va-modal>
      <!-- 弹窗 -->

    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    const tabTitles = [
      { id: 0, name: "查看库存药品" },
      { id: 1, name: "查看清理记录" },
    ];
    const checkboxLabel = "仅查看预警药品";
    const stockColumns = ["药品名", "生产单位", "生产日期", "库存", "阈值", "预警"];
    const recordColumns = ["药品名", "清理日期", "清理负责管理员"];

    return {
      // 切换栏
      tabTitles,
      curTab: 0,

      // 筛选
      filter: "",
      filteredCount: 0,
      checkboxLabel,
      warningOnly: false,

      // 表格
      tableColumns: [],
      tableItems: [],
      stockColumns,
      recordColumns,

      // 编辑
      createdItem: {
        "药品名": "",
        "生产单位": "",
        "生产日期": "",
        "库存": "",
        "阈值": "",
      },
      editedStock: 0,
      editedRow: 0,

      // 分页
      perPage: 8,
      curPage: 1,

      // 弹窗
      showModal: false,
    }
  },

  computed: {
    // 页数
    pages() {
      return Math.ceil(this.filteredCount / this.perPage);
    },

    // 新项是否预警
    createdItemWarning() {
      if (this.createdItem["库存"] == 0 || this.createdItem["阈值"] == 0) {
        return "";
      }
      return this.createdItem["库存"] < this.createdItem["阈值"] ? "是" : "否";
    },

    // 新项是否合法
    createdItemValid() {
      for (var col in this.createdItem) {
        this.createdItem[col];
        if (this.createdItem[col] == "") {
          return false;
        }
      }
      return true;
    }
  },

  methods: {
    // 筛选函数
    filterFunction(source) {
      if (source) {
        return source.toString().includes(this.filter);
      }
      else {
        return false;
      }
    },

    // 转换为药品库存表
    toStock() {
      // 切换每页项目个数
      this.perPage = 9;

      // 重置curPage
      this.curPage = 1;

      // 更新表头
      this.tableColumns = [];
      for (var i = 0; i < this.stockColumns.length; ++i) {
        this.tableColumns.push(this.stockColumns[i]);
      }
      this.tableColumns.push("修改");

      // 从后端获取药品库存
      // fetch("http://124.223.143.21/api/Stock/GetAllStocks", {
      //   method: 'GET',
      //   redirect: 'follow'
      // }).then(response => response.text())
      //   .then(result => {
      //     result = JSON.parse(result); // 将结果转为JSON
      //     this.tableItems = []; // 清空表项
      //     for (i = 0; i < result.length; ++i) {
      //       var flag = result[i].medicineAmount < result[i].thresholdValue;
      //       if (!flag && this.warningOnly) continue;
      //       this.tableItems.push({ // 填入表项
      //         药品名: result[i].medicineName,
      //         生产单位: result[i].manufacturer,
      //         生产日期: result[i].productionDate,
      //         库存: result[i].medicineAmount,
      //         阈值: result[i].thresholdValue,
      //         预警: flag ? "是" : "否",
      //       });
      //     }
      //   })
      //   .catch(error => console.log('error', error));
      this.tableItems = [];
      for (i = 0; i < 20; ++i) {
        var newItem = {
          药品名: "阿米诺司",
          生产单位: "医德格拉米",
          生产日期: "2022-10-12 18:00",
          库存: parseInt(Math.random() * 999),
          阈值: parseInt(Math.random() * 999),
        }
        newItem["预警"] = newItem["库存"] < newItem["阈值"] ? "是" : "否";
        if (!this.warningOnly || newItem["预警"] == "是") {
          this.tableItems.push(newItem);
        }
      }
    },

    // 转换为清理记录表
    toRecord() {
      // 切换每页项目个数
      this.perPage = 11;

      // 重置curPage
      this.curPage = 1;

      // 更新表头
      this.tableColumns = [];
      for (var i = 0; i < this.recordColumns.length; ++i) {
        this.tableColumns.push(this.recordColumns[i]);
      }

      // 从后端获取清理记录
      this.tableItems = [];
      for (i = 0; i < 15; ++i) {
        this.tableItems.push({
          药品名: "阿米诺司",
          清理日期: "2023-8-8 " + i.toString() + ":00",
          清理负责管理员: "夏胡白",
        });
      }
    },

    // 添加表项
    addItem() {
      // 新建对象
      var newItem = {};
      newItem["预警"] = this.createdItemWarning;
      for (var col in this.createdItem) {
        newItem[col] = this.createdItem[col];
        this.createdItem[col] = ""; // 重置createdItem
      }

      // 传入后端


      // 加入表项
      this.tableItems.push(newItem);
    },

    // 打开编辑窗口
    openItemEdition(rowIndex) {
      this.editedStock = this.tableItems[rowIndex]["库存"];
      this.editedRow = rowIndex;
      this.showModal = true;
    },

    // 删除项
    deleteItem(rowIndex) {
      // 修改表项
      this.tableItems.splice(rowIndex, 1);

      // 写入后端

    },

    // 更新库存
    confirmUpdate() {
      // 写入后端
      this.tableItems[this.editedRow]["库存"] = this.editedStock;
      if (this.tableItems[this.editedRow]["库存"] < this.tableItems[this.editedRow]["阈值"]) {
        this.tableItems[this.editedRow]["预警"] = "是";
      }
      else {
        this.tableItems[this.editedRow]["预警"] = "否";
      }

      // 刷新表项
      this.toStock();
    },

    // 取消更新
    cancelUpdate() {
      return;
    },
  },

  mounted() {
    // 初始化表项
    this.toStock();
    this.filteredCount = this.tableItems.length;
  },

  watch: {
    // 监控切换栏
    curTab(newVal, oldVal) {
      if (newVal == oldVal) {
        return;
      }
      if (newVal == 0) {
        this.toStock();
      }
      else if (newVal == 1) {
        this.toRecord();
      }
    },

    // 监控checkbox
    warningOnly() {
      // 异常情况
      if (this.curTab == 1) return;

      // 重置当前页
      this.curPage = 1;

      // 刷新表格
      this.toStock();
    },

    // 监控关键词
    filter() {
      // 重置当前页
      this.curPage = 1;
    }
  },
}
</script>

<style scoped>

.el-main {
  user-select: none;
}

.conditions {
  margin-top: 1%;
  height: 7%;
}

.checkbox {
  margin-left: 5%;
}

.table {
  --va-form-element-default-width: 0;

  .va-input {
    display: block;
  }

  &__slot {
    th {
      vertical-align: middle;
    }
  }
}

/* 弹窗标签 */
.modal-label {
  line-height: 200%;
  font-size: 13px;
}
* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
}

</style>