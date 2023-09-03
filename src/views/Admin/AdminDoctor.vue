<template>
  <el-container>
    <el-main>
      <!-- 条件区 -->
      <div class="conditions">
        <center>
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
    const perPage = 10;
    const tableColumns = ["ID", "诊室", "日期", "坐诊时间", "修改"];

    return {
      // 筛选
      filter: "",
      filteredCount: 0,

      // 表格
      tableColumns,
      tableItems: [],

      // 编辑
      createdItem: {
        "ID": "",
        "诊室": "",
        "日期": "",
        "坐诊时间": "",
      },
      editedRow: 0,
      editedItem: {
        "ID": "",
        "诊室": "",
        "日期": "",
        "坐诊时间": "",
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
      for (let col in this.createdItem) {
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
      let newItem = {};
      for (let col in this.createdItem) {
        newItem[col] = this.createdItem[col];
        this.createdItem[col] = ""; // 重置createdItem
      }

      // 传入后端
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "doctorId": newItem["ID"],
        "clinicName": newItem["诊室"],
        "dateTime": newItem["日期"],
        "period": this.toPeriod(newItem["坐诊日期"]),
      });
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://124.223.143.21/api/Consultationinfo/AddConsult", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.getTable();
        })
        .catch(error => console.log('error', error));

      // 加入表项
      this.tableItems.push(newItem);
    },

    // 打开编辑窗口
    openItemEdition(rowIndex) {
      for (let col in this.editedItem) {
        this.editedItem[col] = this.tableItems[rowIndex][col];
      }
      this.editedRow = rowIndex;
      this.showModal = true;
    },

    // 删除项
    deleteItem(rowIndex) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "doctorId": this.tableItems[rowIndex]["ID"],
        "dateTime": this.tableItems[rowIndex]["日期"],
        "period": this.toPeriod(this.tableItems[rowIndex]["坐诊时间"]),
      });
      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://124.223.143.21/api/Consultationinfo/CancelConsult", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.getTable();
        })
        .catch(error => console.log('error', error));

    },

    // 时间转换为 period
    toPeriod(time) {
      let startTime = parseInt(time.slice(0, 2));
      return [0, 8, 9, 10, 13, 14, 15, 0, 16].findIndex(val => val == startTime);
    },

    // 确认编辑
    confirmUpdate() {
      // 写入后端
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "old": {
          "doctorId": this.tableItems[this.editedRow]["ID"],
          "clinicName": this.tableItems[this.editedRow]["诊室"],
          "dateTime": this.tableItems[this.editedRow]["日期"],
          "period": this.toPeriod(this.tableItems[this.editedRow]["坐诊时间"]),
        },
        "new": {
          "doctorId": this.editedItem["ID"],
          "clinicName": this.editedItem["诊室"],
          "dateTime": this.editedItem["日期"],
          "period": this.toPeriod(this.editedItem["坐诊时间"]),
        }
      });
      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(raw);
      fetch("http://124.223.143.21/api/Consultationinfo/ChangeConsult", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.getTable();
        })
        .catch(error => console.log('error', error));
    },

    // 取消编辑
    cancelUpdate() {
      return;
    },

    // 更新表格
    getTable() {
      fetch("http://124.223.143.21/api/Consultationinfo/AllConsultInfo", {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          console.log(result);
          this.tableItems = [];
          for (let i = 0; i < result.length; ++i) {
            this.tableItems.push({
              "ID": result[i].doctorId,
              "诊室": result[i].clinicName,
              "日期": result[i].date,
              "坐诊时间": result[i].startTime + " - " + result[i].endTime,
            });
          }
        })
        .catch(error => console.log('error', error));
    },
  },

  mounted() {
    this.getTable();
  },

  watch: {
    filter() {
      this.curPage = 1;
    },
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