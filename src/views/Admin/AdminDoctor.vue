<template>
  <el-container>
    <el-main>
      <!-- 条件区 -->
      <div class="conditions">
        <center>
          <span class="search">
            <va-input v-model="filter" placeholder="请输入相关信息"></va-input>
            <!-- <va-date-picker v-model="value" /> -->
          </span>
        </center>
      </div>

      <!-- 条件区 -->

      <!-- 表格 -->
      <div class="table">
        <va-data-table :items="tableItems" :columns="tableColumns" :filter-method="filterFunction" :per-page="perPage"
          :current-page="curPage" hoverable :wrapper-size="570" virtual-scroller noDataFilteredHtml="无数据" noDataHtml="无数据"
          @filtered="filteredCount = $event.items.length">


          <!-- 新建区 -->
          <template #headerAppend>
            <tr class="table-curd__slot">
              <th>
                <va-select style="width:99%; font-weight: 100;" placeholder="请选择医生ID" v-model="newID"
                  :options="doctorIDs" />
              </th>
              <th>
                <va-input style="width:99%; font-weight: 100;" v-model="newName" readonly />
              </th>
              <th>
                <va-select style="width:99%; font-weight: 100;" placeholder="请选择诊室" v-model="newRoom"
                  :options="availableRooms" />
              </th>
              <th>
                <va-popover color="backgroundElement" placement="top" trigger="click">
                  <va-button style="width:99%; font-weight:100;" color="backgroundElement">{{ newDate }}</va-button>
                  <template #body>
                    <div>
                      <va-date-picker stateful v-model="formattedNewDate" @update:model-value="updateDate()"
                        :allowed-years="(date) => date.getFullYear() !== currentDate.getFullYear()" />
                    </div>
                  </template>
                </va-popover>
              </th>
              <th>
                <va-select style="width:46%; font-weight: 100;" placeholder="请选择起始时间" v-model="newStartTime"
                  :options="startTime" />
                <va-input readonly style="font-weight: 100;">
                  ~
                </va-input>
                <va-select style="width:43%; font-weight: 100;" placeholder="请选择结束时间" v-model="newEndTime"
                  :options="endTime" />
              </th>
              <th>
                <va-button style="width:99%; font-weight: 100;" color="backgroundElement"
                  @click="addItem">
                  添加
                </va-button>
              </th>
            </tr>
            <!-- <tr class="table-curd__slot">
              <th v-for="col in tableColumns.slice(0, -1)" :key="col">
                <va-input v-model="createdItem[col]" :placeholder="col" />
              </th>
              <th>
                <va-button :disabled="!createdItemValid" block @click="addItem">添加</va-button>
              </th>
            </tr> -->
          </template>
          <!-- 新建区 -->

          <!-- 修改操作 -->
          <template #cell(修改)="{ rowIndex }">
            <va-button preset="plain" icon="delete" class="ml-3" @click="showConfirm = true; deletedRow = rowIndex" />
          </template>

          <!-- 分页 -->
          <template #bodyAppend>
            <br>
            <tr>
              <td colspan="6">
                <va-pagination v-model="curPage" :pages="pages" style="justify-content: center" :visible-pages="10" />
              </td>
            </tr>
          </template>

        </va-data-table>
      </div>
      <!-- 表格 -->

      <!-- 弹窗 -->
      <va-modal v-model="showConfirm" ok-text="确认" cancel-text="取消" @ok="deleteItem(deletedRow)">
        <span>确定删除吗？</span>
      </va-modal>
      <!-- 弹窗 -->

    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    const perPage = 10;
    const tableColumns = ["ID", "医生姓名", "诊室", "日期", "坐诊时间", "修改"];

    return {
      // 筛选
      filter: "",
      filteredCount: 0,

      // 表格
      tableColumns,
      tableItems: [],

      // 编辑
      deletedRow: 0,

      // 分页
      perPage,
      curPage: 1,

      // 弹窗
      showModal: false,
      showConfirm: false,

      // 数据库中的医生ID
      doctorIDs: [],

      // 数据库中的医生姓名
      doctorNames: [],

      // 数据库中的科室列表
      departments: [],

      currentYear: 2023,

      newID: "请选择医生ID",

      newName: "医生姓名",

      newRoom: "请选择诊室",

      newDate: "请选择日期",

      formattedNewDate: new Date(),

      availableRooms: [],

      showDatepicker: false,

      newTimeper: "请选择坐诊时间",
      
      timePers: ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"],

      newStartTime: "请选择起始时间",

      newEndTime: "请选择结束时间",

      defaultStTime: ["请选择起始时间", "08:00", "09:00", "10:00", "13:00", "14:00", "15:00", "16:00"],

      startTime: ["请选择起始时间", "08:00", "09:00", "10:00", "13:00", "14:00", "15:00", "16:00"],

      defaultEdTime: ["请选择结束时间", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],

      endTime: ["请选择结束时间", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],

      timePoints: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    }
  },

  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.filteredCount / this.perPage);
    },

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
      // 传入后端
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var l, r;
      for (let i = 0; i < this.timePoints.length; i++) {
        if (this.newStartTime == this.timePoints[i]) {
          l = i;
        }
        if (this.newEndTime == this.timePoints[i]) {
          r = i;
        }
      }

      for (; l < r; l++) {
        let raw = JSON.stringify({
          "doctorId": this.newID,
          "clinicName": this.newRoom,
          "dateTime": this.newDate,
          "period": this.toPeriod(this.timePoints[l].toString() + " - " + this.timePoints[l + 1].toString()), // (newItem["坐诊日期"]),
        });
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("http://124.223.143.21/api/Consultationinfo/AddConsult", requestOptions)
          .then(response => response.text())
          .then(() => {
            this.getTable();
          })
          .catch(error => console.log('error', error));
      }
    },

    // 删除项
    deleteItem(rowIndex) {
      var lastNum = this.tableItems.length % this.perPage;
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
        .then(() => {
          this.getTable();
          // var word = this.filter;
          // this.filter = "114514";
          // this.filter = word;
          if (lastNum == 1 && this.curPage == this.pages) {
            this.curPage--;
          }
        })
        .catch(error => console.log('error', error));

    },

    // 时间转换为 period
    toPeriod(time) {
      let startTime = parseInt(time.slice(0, 2));
      return [8, 9, 10, 13, 14, 15, 16].findIndex(val => val == startTime) + 1;
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
      fetch("http://124.223.143.21/api/Consultationinfo/ChangeConsult", requestOptions)
        .then(response => response.text())
        .then(
          this.getTable()
        )
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
            this.tableItems = [];
            for (let i = 0; i < result.length; ++i) {
              this.tableItems.push({
                "ID": result[i].doctorId,
                "医生姓名": result[i].doctorName,
                "诊室": result[i].clinicName,
                "日期": result[i].date.slice(0, 10),
                "坐诊时间": result[i].startTime + " - " + result[i].endTime,
              });
            }
          })
          .catch(error => console.log('error', error));
    },

    // 获取表格候选信息（医生ID，诊室列表，日期）
    getInfo() {
      axios.get('http://124.223.143.21:4999/api/Doctors')
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            this.doctorIDs.push(item.doctorId);
            this.doctorNames.push(item.name);
          }
        })
        .catch(error => console.log('error', error));

      axios.get('http://124.223.143.21/api/Consultationinfo/GetAllRooms')
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            this.availableRooms.push(item.consultingRoomName);
          }
        })
        .catch(error => console.log('error', error));

      // this.newDate = new Date();
      // this.currentYear = this.newDate.getFullYear();
    },

    updateDate() {
      var y = this.formattedNewDate.getFullYear();
      var m = (this.formattedNewDate.getMonth() + 1).toString().padStart(2, '0');
      var d = this.formattedNewDate.getDate().toString().padStart(2, '0');
      this.newDate = y + '-' + m + '-' + d;
    }

  },

  mounted() {
    this.getTable("请选择日期");
    this.getInfo();
  },

  watch: {
    filter() {
      this.curPage = 1;
    },

    newID(newVal) {
      if (newVal == "请选择医生ID") {
        return;
      }
      fetch("http://124.223.143.21/api/Doctors/id?id=" + newVal, {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          this.newName = result.name;
        })
        .catch(error => console.log('error', error));
    },

    newStartTime(newVal) {
      switch (newVal) {
        case "请选择起始时间":
          this.endTime = this.defaultEdTime.slice(1, 8);
          break;
        case "08:00":
          this.endTime = this.timePoints.slice(1, 4);
          break;
        case "09:00":
          this.endTime = this.timePoints.slice(2, 4);
          break;
        case "10:00":
          this.endTime = this.timePoints.slice(3, 4);
          break;
        case "13:00":
          this.endTime = this.timePoints.slice(5, 9);
          break;
        case "14:00":
          this.endTime = this.timePoints.slice(6, 9);
          break;  
        case "15:00":
          this.endTime = this.timePoints.slice(7, 9);
          break;
        case "16:00":
          this.endTime = this.timePoints.slice(8, 9);
          break;
      }
      this.endTime.push("请选择结束时间");
    },
    
    newEndTime(newVal) {
      switch (newVal) {
        case "请选择结束时间":
          this.startTime = this.defaultStTime;
          break;
        case "09:00":
          this.startTime = this.timePoints.slice(0, 1);
          break;
        case "10:00":
          this.startTime = this.timePoints.slice(0, 2);
          break;
        case "11:00":
          this.startTime = this.timePoints.slice(0, 3);
          break;
        case "14:00":
          this.startTime = this.timePoints.slice(4, 5);
          break;
        case "15:00":
          this.startTime = this.timePoints.slice(4, 6);
          break;  
        case "16:00":
          this.startTime = this.timePoints.slice(4, 7);
          break;
        case "17:00":
          this.startTime = this.timePoints.slice(4, 8);
          break;
      }
      this.startTime.push("请选择起始时间");
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

  .va-select {
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