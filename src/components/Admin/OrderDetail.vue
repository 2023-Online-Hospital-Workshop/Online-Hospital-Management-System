<template>
  <div class="detail-box">
    <div class="table">
      <va-data-table 
      :items="items" 
      :columes="columes" 
      :wrapper-size="300" 
      sticky-header 
      hoverable 
      virtual-scroller
      striped
      >
      </va-data-table>
    </div>
    <center>
      <div class="buttons">
        <va-button @click="confirm">确认订单</va-button> &emsp;
        <va-button @click="cancel">取消操作</va-button>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: ["orderId"], // 从父组件获得的参数
  data() {
    return {
      // 表头
      columes: [
        { key: "药品名" },
        { key: "数量" },
        { key: "单位" },
        { key: "金额" },
      ],

      // 表项
      items: [
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
        {
          药品名: "阿米诺司",
          数量: 2,
          单位: "盒",
          金额: (100.00).toFixed(2),
        },
      ],
    }
  },
  methods: {
    // 取消操作
    cancel() {
      this.$emit("closeBox", false); // 向父组件发出取消信号
    },

    // 确认操作
    confirm() {
      this.$emit("closeBox", true); // 向父组件发出确认信号
    }
  },
  watch: {
    // 当父组件传来的订单号变化时更新表项
    orderId(newVal, oldVal) {
      if(oldVal !== newVal) {
        console.log("select " + newVal.toString());
        //向后端请求newVal订单信息并更新items
      }
    }
  }
}
</script>

<style scoped>
.detail-box{
  position: absolute;
  left: 550px;
  top: 200px;
  height: 360px;
  width: 640px;
  border-radius: 2px;
  box-shadow: 2px 2px 5px #888;
  margin: auto;
  background-color: lightskyblue;
  user-select: none;
}

.table {
  background-color:rgb(194, 230, 252);
}

.buttons {
  margin-top: 10px;
}
</style>
  