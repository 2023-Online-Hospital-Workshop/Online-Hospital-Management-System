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
          <!-- 下拉栏 -->
          <span class="select">
            <va-select
              v-model="selected"
              :options="departments"
            />
          </span>
          <!-- 搜索框 -->
          <span class="search">
            <va-input v-model="searchKeyword" placeholder="请输入相关信息"></va-input>
            <va-button @click="search">搜索</va-button>
          </span>
        </center>
      </div>

      <!-- 表格 -->
      <div class="table">
        <va-data-table
        class="table-crud"
        :items="items"
        :columns="columns"
        :filter="selected"
        :filter-method="filterFunction"
        :per-page="pageSize"
        :current-page="currentPage"
        :wrapper-size="550"
        hoverable
        virtual-scroller
        @filtered="filteredCount=$event.items.length"
        >
          <!-- 新建区 -->
          <template #headerAppend>
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
          <template #cell(修改)="{ rowIndex }">
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

    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {
    
  },

  data() {
    const departments = [ "所有科室", "消化内科", "神经内科", "检验科", "泌尿外科", "呼吸内科", "骨科" ];
    const pageSize = 10;
    const doctorColumns = [ "ID", "姓名", "科室", "坐诊开始时间", "坐诊结束时间" ];
    const columns = [ "ID", "姓名", "科室", "坐诊开始时间", "坐诊结束时间", "修改" ];

    return {
      // 常量
      departments,
      pageSize,
      doctorColumns,
      columns,

      // 变量
      searchKeyword: "", // 用户输入关键词
      selected: "所有科室", // 当前选择科室
      createdItem: {}, // 新建
      editedItem: {}, // 编辑项
      items: [], // 表项
      currentPage: 1, // 当前页
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
      for (var i = 0; i < this.doctorColumns.length; ++i) {
        if (this.createdItem[this.doctorColumns[i]] == "") return false;
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

    // 添加表项
    addItem() {
      var newItem = {};
      for (var i = 0; i < this.doctorColumns.length; ++i) {
        newItem[this.doctorColumns[i]] = this.createdItem[this.doctorColumns[i]];
      }
      this.items.push(newItem);
    },

    // 打开编辑窗口
    openItemEdition(rowIndex) {
      console.log(rowIndex);
    },

    // 删除项
    deleteItem(rowIndex) {
      this.items.splice(rowIndex, 1);
      
    },
  },

  mounted() {
    for(var i = 0; i < 15; ++i) {
      this.items.push({
        ID: 36436,
        姓名: "袁野",
        科室: "泌尿外科",
        坐诊开始时间: "2023-5-" + (i+1).toString() + " 9:00",
        坐诊结束时间: "2023-5-" + (i+1).toString() + " 17:00",
      });
    }

    for (i = 0; i < this.doctorColumns.length; ++i) {
      this.createdItem[this.doctorColumns[i]] = "";
      this.editedItem[this.doctorColumns[i]] = "";
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
  height: 40px;
  justify-content: center;
}
.select {
  margin: 10px;
}

.search {
  margin: 10px;
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


</style>

<!-- 
  1. 照搬AdminMedicine，同步修改
  2. 问题：filterFunction 的参数与 AdminOrder 中的不同，这里只有第一个属性的信息
 -->