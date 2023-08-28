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
            <va-select
              v-model="selected"
              :options="departments"
            />
          </span>
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
        :filter-method="filterFunction"
        :per-page="pageSize"
        :current-page="currentPage"
        :wrapper-size="550"
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
    const departments = [ "消化内科", "神经内科", "检验科", "泌尿外科", "呼吸内科", "骨科" ];
    const pageSize = 12;
    const columns = [ "ID", "姓名", "科室", "坐诊开始时间", "坐诊结束时间" ];

    return {
      // 常量
      departments,
      pageSize,
      columns,
      
      // 变量
      selected: "请选择科室", // 当前选择科室
      items: [], // 表项
      currentPage: 1, // 当前页
      filteredCount: 0, // 筛选出的条目数
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
      console.log(this.columns);
      console.log(source);
      //console.log(this.selected);
      return true;
    },
  },

  mounted() {
    for(var i = 0; i < 15; ++i) {
      this.items.push({
        ID: 36436,
        姓名: "袁野",
        科室: "泌尿外科",
        坐诊开始时间: "2023-5-" + i.toString() + " 9:00",
        坐诊结束时间: "2023-5-" + i.toString() + " 17:00",
      });
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


</style>

<!-- 
  1. 照搬AdminMedicine，同步修改
  2. 问题：filterFunction 的参数与 AdminOrder 中的不同，这里只有第一个属性的信息
  3. 待完善
 -->