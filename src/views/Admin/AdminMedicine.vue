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
            <va-tab v-for="title in tabTitle" :key="title.id">
              {{ title.name }}
            </va-tab>
          </template>
        </va-tabs>
      </div>

      <!-- 条件区 -->
      <div class="conditions"> 
        <center>
          <span class="search">
            <va-input v-model="searchKeyword" placeholder="请输入相关信息">
            </va-input>
            <va-button @click="search">搜索</va-button>
          </span>
          <span v-if="curTab==0" class="checkbox">
            <va-checkbox 
            v-model="warningOnly"
            :label="checkboxLabel"
            />
          </span>
        </center>
      </div>

      <!-- 表格 -->
      <div class="table">
        <va-data-table
        class="table-crud"
        :items="items"
        :columns="columns"
        :filter-method="filterFunction"
        :per-page="pageSize"
        :current-page="currentPage"
        :wrapper-size="500"
        hoverable
        virtual-scroller
        @filtered="filteredCount=$event.items.length"
        >
          <!-- 新建区 -->
          <template v-if="curTab==0" #headerAppend>
            <tr class="table-curd__slot">
              <th
                v-for="key in Object.keys(createdItem)"
                :key="key"
              >
                <!-- 输入框 -->
                <va-input
                  v-model="createdItem[key]"
                  :placeholder="key"
                />
              </th>
              <th>
                <!-- 添加按钮 -->
                <va-button
                  :disabled="!validItem"
                  block
                  @click="addItem"
                >
                  添加
                </va-button>
              </th>
            </tr>
          </template>

          <!-- 修改操作 -->
          <template v-if="curTab==0" #cell(修改)="{ rowIndex }">
            <va-button
              preset="plain"
              icon="edit"
              @click="openItemEdition(rowIndex)"
            />
            <va-button
              preset="plain"
              icon="delete"
              class="ml-3"
              @click="deleteItem(rowIndex)"
            />
          </template>

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
      <va-modal
        class="modal-crud"
        v-model="showModal"
        title="编辑库存"
        ok-text="确认"
        cancel-text="取消"
        @ok="confirmUpdate"
        @cancel="cancelUpdate"
      >
        <va-input
          v-model="editedStock"
        />
      </va-modal>

    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {

  },

  data() {
    const tabTitle = [
        { id: 0, name: "查看库存药品" },
        { id: 1, name: "查看清理记录" },
      ];
    const checkboxLabel = "仅查看预警药品";
    const pageSize = 10;
    const stockColumns = [ "药品名", "生产单位", "生产日期", "库存", "阈值", "预警" ];
    const recordColumns = [ "药品名", "清理日期", "清理负责管理员"];

    return {
      // 常量
      tabTitle,
      checkboxLabel,
      pageSize,
      stockColumns,
      recordColumns,

      // 变量
      curTab: 0, // 当前栏
      searchKeyword: "", // 用户输入
      warningOnly: false, // 仅查看预警
      createdItem: {}, // 新项
      editedStock: 0, // 编辑项
      currentPage: 1, // 当前页
      showModal: false, // 是否显示弹窗
      columns: [], // 表头
      items: [], // 表项
      filteredCount: 0, // 筛选出的条目数
    }
  },

  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.filteredCount / this.pageSize);
    },

    // 新项是否合法
    validItem() {
      for (var i = 0; i < this.stockColumns.length; ++i) {
        if (this.createdItem[this.stockColumns[i]] == "") return false;
      }
      return true;
    }
  },

  methods: {
    // 点击搜索
    search() {
    },

    // 筛选函数
    filterFunction(source) {
      if(source) {
        return source.toString().includes(this.searchKeyword);
      }
      else {
        return false;
      }
    },

    // 转换为药品库存表
    toStock() {
      // 更新表头
      this.columns = [];
      for (var i = 0; i < this.stockColumns.length; ++i) {
        this.columns.push({ key: this.stockColumns[i], label: this.stockColumns[i] });
      }
      this.columns.push({ key: "修改",  label: "修改"});

      // 更新表项
      fetch("http://124.223.143.21/api/Stock/GetAllStocks", {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result); // 将结果转为JSON
          this.items = []; // 清空表项
          for (var i = 0; i < result.length; ++i) {
            var flag = result[i].medicineAmount < result[i].thresholdValue;
            if (!flag && this.warningOnly) continue;
            this.items.push({ // 填入表项
              药品名: result[i].medicineName,
              生产单位: result[i].manufacturer,
              生产日期: result[i].productionDate,
              库存: result[i].medicineAmount,
              阈值: result[i].thresholdValue,
              预警: flag ? "是" : "否",
            });
          }
        })
        .catch(error => console.log('error', error));
      // this.items.push({ // 填入表项
      //   药品名: "阿米诺司",
      //   生产单位: "医德格拉米",
      //   生产日期: "2022-10-12 18:00",
      //   库存: 1926,
      //   阈值: 817,
      //   预警: "否",
      // });
    },

    // 转换为清理记录表
    toRecord() {
      // 更新表头
      this.columns = [];
      for (var i = 0; i < this.recordColumns.length; ++i) {
        this.columns.push({ key: this.recordColumns[i], label: this.recordColumns[i] });
      }

      // 更新表项
      this.items = []; // 清空表项
      // 从后端获取清理记录

      for (i = 0; i < 15; ++i) {
        this.items.push({
          药品名: "阿米诺司",
          清理日期: "2023-8-8 " + i.toString() + ":00",
          清理负责管理员: "夏胡白",
        });
      }
    },
    
    // 添加表项
    addItem() {
      var flag = this.createdItem["库存"] < this.createdItem["阈值"]; 
      this.items.push({ // 填入表项
        药品名: this.createdItem["药品名"],
        生产单位: this.createdItem["生产单位"],
        生产日期: this.createdItem["生产日期"],
        库存: this.createdItem["库存"],
        阈值: this.createdItem["阈值"],
        预警: flag ? "是" : "否",
      });
      console.log("add "+(this.createdItem).toString());
    },

    // 打开编辑窗口
    openItemEdition(rowIndex) {
      this.editedStock = this.items[rowIndex]["库存"];
      this.showModal = true;
    },

    // 删除项
    deleteItem(rowIndex) {
      this.items.splice(rowIndex, 1);
      console.log("delete " + (rowIndex).toString());
    },

    // 更新库存
    confirmUpdate() {
      return;
    },

    // 取消更新
    cancelUpdate() {
      return;
    },
  },

  mounted() {
    // 初始化createdItem
    for (var i = 0; i < this.stockColumns.length; ++i) {
      this.createdItem[this.stockColumns[i]] = "";
    }

    // 初始化表项
    this.toStock();
    this.filteredCount = this.items.length;
  },

  watch: {
    // 监控切换栏
    curTab(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal == 0) {
        this.toStock();
      } else if (newVal == 1) {
        this.toRecord();
      }
    },

    // 监控checkbox
    warningOnly() {
      if(this.curTab == 1) return;
      this.toStock();
    }
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

.conditions {
  margin-top: 20px;
  height: 40px;
  justify-content: center;
}

.checkbox {
  margin-left: 30px;
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
.modal-crud {
  .va-input {
    display: block;
  }
}

* {
  font-family: SFRegular;
}
</style>

<!--
  1. 前后端交互
  2. 新增表项“预警”不应该由用户输入
 -->