<template>
  <el-container>

    <el-header>
      <h4 class="va-h4">
        坐诊医生管理
      </h4>
    </el-header>

    <el-main>
      <!-- 条件区 -->
      <div class="conditions">
        <center>
          <span class="select">
            <va-select v-model="selected" :options="departments" />
          </span>
          <span class="search">
            <va-input v-model="filter" placeholder="请输入相关信息"></va-input>
          </span>
        </center>
      </div>
      <!-- 条件区 -->

      <!-- 表格 -->
      <div class="table">
        <va-data-table :items="tableItems" :columns="tableColumns" :filter-method="filterFunction" :per-page="perPage"
          :current-page="curPage" hoverable :wrapper-size="570" virtual-scroller
          @filtered="filteredCount = $event.items.length">

          <!-- 新建区 -->
          <template #headerAppend>
            <tr class="table-curd__slot">
              <th v-for="col in tableColumns.slice(0, -1)" :key="col">
                <va-input v-model="createdItem[col]" :placeholder="col" />
              </th>
              <th>
                <va-button :disabled="!createdItemValid" block @click="addItem">添加</va-button>
              </th>
            </tr>
          </template>
          <!-- 新建区 -->

          <!-- 修改操作 -->
          <template #cell(修改)="{ rowIndex }">
            <va-button preset="plain" icon="edit" @click="openItemEdition(rowIndex)" />
            <va-button preset="plain" icon="delete" class="ml-3" @click="deleteItem(rowIndex)" />
          </template>

          <!-- 分页 -->
          <template #bodyAppend>
            <br>
            <tr>
              <td colspan="6">
                <va-pagination v-model="curPage" :pages="pages" style="justify-content: center" />
              </td>
            </tr>
          </template>

        </va-data-table>
      </div>
      <!-- 表格 -->

      <!-- 弹窗 -->
      <va-modal v-model="showModal" title="编辑坐诊信息" size="small" ok-text="确认" cancel-text="取消" @ok="confirmUpdate"
        no-outside-dismiss @cancel="cancelUpdate">
        <div v-for="col in tableColumns.slice(0, -1)" :key="col">
          <br>
          <div class="modal-label">{{ col }}</div>
          <va-input v-model="editedItem[col]" />
        </div>
      </va-modal>
      <!-- 弹窗 -->

    </el-main>
  </el-container>
</template>

<script>

export default {
  data() {
    const departments = ["所有科室", "消化内科", "神经内科", "检验科", "泌尿外科", "呼吸内科", "骨科"];
    const perPage = 10;
    const tableColumns = ["ID", "姓名", "科室", "坐诊开始时间", "坐诊结束时间", "修改"];

    return {
      // 筛选
      filter: "",
      filteredCount: 0,
      departments,
      selected: departments[0],

      // 表格
      tableColumns,
      tableItems: [],
      allItems: [],

      // 编辑
      createdItem: {
        "ID": "",
        "姓名": "",
        "科室": "",
        "坐诊开始时间": "",
        "坐诊结束时间": "",
      },
      editedRow: 0,
      editedItem: {
        "ID": "",
        "姓名": "",
        "科室": "",
        "坐诊开始时间": "",
        "坐诊结束时间": "",
      },

      // 分页
      perPage,
      curPage: 1,

      // 弹窗
      showModal: false,

    }
  },

  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.filteredCount / this.perPage);
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

    // 添加表项
    addItem() {
      // 新建对象
      var newItem = {};
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
      for (var col in this.editedItem) {
        this.editedItem[col] = this.tableItems[rowIndex][col];
      }
      this.editedRow = rowIndex;
      this.showModal = true;
      console.log(this.showModal);
    },

    // 删除项
    deleteItem(rowIndex) {
      this.tableItems.splice(rowIndex, 1);

    },

    // 确认编辑
    confirmUpdate() {
      // 写入后端
      for (var col in this.editedItem) {
        this.tableItems[this.editedRow][col] = this.editedItem[col];
      }

      // 刷新表项
      this.getTable();
    },

    // 取消编辑
    cancelUpdate() {
      return;
    },

    getTable() {
      this.allItems = [];
      this.tableItems = [];
      for (var i = 0; i < 15; ++i) {
        this.allItems.push({
          ID: 36436,
          姓名: "袁野",
          科室: "泌尿外科",
          坐诊开始时间: "2023-5-" + (i + 1).toString() + " 9:00",
          坐诊结束时间: "2023-5-" + (i + 1).toString() + " 17:00",
        });
        this.tableItems.push({
          ID: 36436,
          姓名: "袁野",
          科室: "泌尿外科",
          坐诊开始时间: "2023-5-" + (i + 1).toString() + " 9:00",
          坐诊结束时间: "2023-5-" + (i + 1).toString() + " 17:00",
        });
      }
    },
  },

  mounted() {
    this.getTable();
  },

  watch: {
    filter() {
      this.curPage = 1;
    },

    selected() {
      this.curPage = 1;
      this.tableItems = [];
      for (var i = 0; i < this.allItems.length; ++i) {
        if (this.selected == "所有科室" || this.allItems[i]["科室"] == this.selected) {
          this.tableItems.push(this.allItems[i]);
        }
      }
    }
  },

}
</script>

<style scoped>
.el-main {
  user-select: none;
}

.search {
  margin-left: 4%;
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

.modal-label {
  line-height: 200%;
  font-size: 13px;
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