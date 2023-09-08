<template>
  <el-container>
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
          <span>
            <va-input v-model="filter" placeholder="请输入相关信息"></va-input>
          </span>
          <span v-if="curTab == 0">
            <va-input placeholder="扫码入库" class="mb-6" id="scannedData" v-model="scannedDataInput"
              @keydown.enter="sendData()" />
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
          :current-page="curPage" :wrapper-size="530" hoverable virtual-scroller noDataFilteredHtml="无数据" noDataHtml="无数据"
          @filtered="filteredCount = $event.items.length">

          <!-- 新建区 -->
          <template v-if="curTab == 0" #headerAppend>
            <tr class="table-curd__slot">
              <th v-for="col in stockColumns.slice(0, -3)" :key="col">
                <va-input style="width:99%" v-model="createdItem[col]" :placeholder="col" />
              </th>
              <th>
                <va-input style="width:99%" v-model='createdItem["库存"]' placeholder="库存" mask="numeral" />
              </th>
              <th>
                <va-input style="width:99%" v-model='createdItem["阈值"]' placeholder="阈值" mask="numeral" />
              </th>
              <th>
                <va-input style="width:99%" v-model="createdItemWarning" placeholder="预警" readonly />
              </th>
              <th>
                <va-button style="width:99%" :disabled="!createdItemValid" block @click="addItem">添加</va-button>
              </th>
            </tr>
          </template>
          <!-- 新建区 -->

          <!-- 修改操作 -->
          <template v-if="curTab == 0" #cell(修改)="{ rowIndex }">
            <va-button preset="plain" icon="delete" class="ml-3" @click="showConfirm = true; deletedRow = rowIndex" />
          </template>
          <!-- 修改操作 -->

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
      <!-- 表格 -->

      <!-- 弹窗 -->
      <va-modal v-model="showModal" title="编辑" ok-text="确认" cancel-text="取消" no-outside-dismiss @ok="confirmUpdate"
        @cancel="cancelUpdate">
        <div class="modal-label">库存</div>
        <va-input v-model="editedStock" />
      </va-modal>

      <va-modal v-model="showConfirm" ok-text="确认" cancel-text="取消"
        @ok="deleteItem(deletedRow)">
        <span>确定删除吗？</span>
      </va-modal>
      <!-- 弹窗 -->

    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    const tabTitles = [
      { id: 0, name: "查看库存药品" },
      { id: 1, name: "查看清理记录" },
    ];
    const checkboxLabel = "仅查看预警药品";
    const stockColumns = ["药品名", "生产单位", "生产日期", "库存", "阈值", "预警"];
    const recordColumns = ["药品名", "生产单位", "生产日期", "清理日期", "清理负责管理员"];

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
      deletedRow: 0,

      // 分页
      perPage: 8,
      curPage: 1,

      // 弹窗
      showModal: false,

      scannedDataInput: '', // 用于绑定输入框的数据  
      MedicineData: {
        showapi_res_body: {
        }
      },
      showConfirm: false,
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
      return parseInt(this.createdItem["库存"]) < parseInt(this.createdItem["阈值"]) ? "是" : "否";
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

    //自动扫码
    sendData() {
      const scannedData = this.scannedDataInput;

      // 检查是否有扫描到数据
      if (scannedData) {
        console.log(scannedData);
        const formData = new FormData();

        formData.append("showapi_appid", '1475668'); // 这里需要改成自己的appid
        formData.append("showapi_sign", '2c780d7234d547a49d4df8a0e9331f2d'); // 这里需要改成自己的应用的密钥secret
        formData.append("code", scannedData);

        axios
          .post("https://route.showapi.com/66-22?", formData)
          .then((response) => {
            this.MedicineData = response.data;
            console.log(this.MedicineData);
            console.log(this.MedicineData.showapi_res_body.goodsName);
            console.log(this.MedicineData.showapi_res_body.manuName);
            this.createdItem["药品名"] = this.MedicineData.showapi_res_body.goodsName;
            this.createdItem["生产单位"] = this.MedicineData.showapi_res_body.manuName;

          })
          .catch((error) => {
            console.error(error);
            alert("操作失败!");
          });
        //清空
        this.scannedDataInput = '';
      } else {
        alert('请先扫描数据！');
      }
    },

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
      for (let i = 0; i < this.stockColumns.length; ++i) {
        this.tableColumns.push(this.stockColumns[i]);
      }
      this.tableColumns.push("修改");

      //从后端获取药品库存
      fetch("http://124.223.143.21/api/Stock/GetAllStocks", {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result); // 将结果转为JSON
          this.tableItems = []; // 清空表项
          for (let i = 0; i < result.length; ++i) {
            let flag = result[i].medicineAmount < result[i].thresholdValue;
            if (!flag && this.warningOnly) continue;
            this.tableItems.push({ // 填入表项
              "药品名": result[i].medicineName,
              "生产单位": result[i].manufacturer,
              "生产日期": result[i].productionDate,
              "库存": result[i].medicineAmount,
              "阈值": result[i].thresholdValue,
              "预警": flag ? "是" : "否",
            });
          }
        })
        .catch(error => console.log('error', error));
    },

    // 转换为清理记录表
    toRecord() {
      // 切换每页项目个数
      this.perPage = 11;

      // 重置curPage
      this.curPage = 1;

      // 更新表头
      this.tableColumns = [];
      for (let i = 0; i < this.recordColumns.length; ++i) {
        this.tableColumns.push(this.recordColumns[i]);
      }

      // 从后端获取清理记录
      fetch("http://124.223.143.21/api/Medicine/GetCleanedMedicines", {
        method: 'GET',
        redirect: 'follow'
      }).then(response => response.text())
        .then(result => {
          result = JSON.parse(result); // 将结果转为JSON
          this.tableItems = []; // 清空表项
          for (let i = 0; i < result.length; ++i) {
            this.tableItems.push({
              "药品名": result[i].medicineName,
              "生产单位": result[i].manufacturer,
              "生产日期": result[i].productiondate,
              "清理日期": result[i].cleanDate,
              "清理负责管理员": result[i].cleanAdministrator,
            });
          }
        })
        .catch(error => console.log('error', error));
    },

    // 添加表项
    addItem() {
      // 新建对象
      let newItem = {};
      newItem["预警"] = this.createdItemWarning;
      for (let col in this.createdItem) {
        newItem[col] = this.createdItem[col];
        this.createdItem[col] = ""; // 重置createdItem
      }

      // 传入后端
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "medicineName": newItem["药品名"],
        "manufacturer": newItem["生产单位"],
        "productionDate": newItem["生产日期"],
        "medicineShelflife": 1, // 暂定
        "medicineAmount": parseInt(newItem["库存"]),
        "thresholdValue": parseInt(newItem["阈值"]),
        "administratorId": sessionStorage.getItem('userID'),
        "purchasePrice": 1, // 暂定
        "medicineType": "1", // 暂定
        "applicableSymptom": "1", // 暂定
        "specification": "1", // 暂定
        "singledose": "1", // 暂定
        "administration": "1", // 暂定
        "attention": "1", // 暂定
        "frequency": "1", // 暂定
        "sellingprice": 1, // 暂定
      });
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://124.223.143.21/api/Medicine/AddStock", requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result != "Medicine stock added successfully.") {
            alert("参数错误！");
          }
          this.toStock();
        })
        .catch(error => {
          alert("数据冲突！");
          console.log('error', error)
        });

    },

    // 打开编辑窗口
    openItemEdition(rowIndex) {
      this.editedStock = this.tableItems[rowIndex]["库存"];
      this.editedRow = rowIndex;
      this.showModal = true;
    },

    // 删除项
    deleteItem(rowIndex) {
      fetch("http://124.223.143.21/api/Medicine/CleanMedicine"
        + "?medicineName=" + this.tableItems[rowIndex]["药品名"]
        + "&manufacturer=" + this.tableItems[rowIndex]["生产单位"]
        + "&productionDate=" + this.tableItems[rowIndex]["生产日期"]
        + "&administratorId=" + sessionStorage.getItem('userID'), {
        method: 'PUT',
        redirect: 'follow'
      })
        .then(response => response.text())
        .then(result => {
          if (result == "Medicine cleaned successfully.") {
            this.toStock();
          }
          else {
            alert("请求非法！");
          }
        })
        .catch(error => console.log('error', error));
    },
  },

  mounted() {
    // 初始化表项
    this.toStock();
    this.filteredCount = this.tableItems.length;
    console.log("adminID:", sessionStorage.getItem('userID'));
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

.conditions span {
  margin-left: 10px;
  margin-right: 10px;
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
  /* 应用字体 */
  font-family: AliRegular;
  --va-font-family: AliRegular;
}

.va-data-table {
  /* 表头大小 */
  --va-data-table-thead-font-size: 1rem;
  height: 50%;
}
</style>