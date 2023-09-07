<template>
  <div>
    <h1 class="title">药品营收统计</h1>
    <div class="cards">
      <va-card
        square
        outlined
        class="card"
        style="background: rgb(0, 47, 176); color: white"
      >
        <va-card-title>总收入</va-card-title>
        <va-card-content>{{ totIncome }}</va-card-content>
      </va-card>
      <div class="operator">-</div>
      <va-card
        square
        outlined
        class="card"
        style="background: rgb(0, 47, 176); color: white"
      >
        <va-card-title>总支出</va-card-title>
        <va-card-content>{{ totOutcome }}</va-card-content>
      </va-card>
      <div class="operator">=</div>
      <va-card
        square
        outlined
        class="card"
        style="color: white"
        :style="{ background: profitColor }"
      >
        <va-card-title>盈利</va-card-title>
        <va-card-content>{{ profit }}</va-card-content>
      </va-card>
    </div>
    <va-data-table class="table" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ row }">
        <va-button
          @click="toggleRowDetails(row)"
          :icon="
            expandedRow === row.initialIndex ? 'va-arrow-up' : 'va-arrow-down'
          "
          preset="primary"
          class="w-full"
        >
          {{ expandedRow === row.initialIndex ? "隐藏" : "查看" }}
        </va-button>
      </template>
      <template #expandableRow="{ rowData }">
        <div class="graph" v-if="getFolder(rowData)">
          <div id="chart" style="width: 45vw; height: 40vh"></div>
          <p>{{ getTimelineData(rowData) }}</p>
        </div>
      </template>
    </va-data-table>
  </div>
</template>
  
<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    return {
      expandedRow: null,
      selectedMedicineName: null,
      selectManufacturer: null,
      totIncome: 0,
      totOutcome: 0,
      medicineData: [],
      columns: [
        {
          key: "药品名称",
          name: "medicineName",
          width: "80px",
          sortable: true,
        },
        {
          key: "制药公司",
          name: "manufacturer",
          width: "120px",
          sortable: true,
        },
        {
          key: "采购量",
          name: "purchaseAmount",
          width: "60px",
          sortable: true,
          sortingFn: (a, b) => parseInt(a) - parseInt(b),
        },
        {
          key: "采购金额",
          name: "purchaseCost",
          width: "60px",
          sortable: true,
          sortingFn: (a, b) => parseInt(a) - parseInt(b),
        },
        {
          key: "销售量",
          name: "sellAmount",
          width: "60px",
          sortable: true,
          sortingFn: (a, b) => parseInt(a) - parseInt(b),
        },
        {
          key: "销售金额",
          name: "sellIncome",
          width: "60px",
          sortable: true,
          sortingFn: (a, b) => parseInt(a) - parseInt(b),
        },
        { key: "走势图", name: "actions", width: "50px" },
      ],

      items: [],
      timeline: [],
      purchaseStatistics: [],
      sellStatistics: [],
    };
  },
  computed: {
    profit() {
      return (this.totIncome - this.totOutcome).toFixed(2);
    },
    profitColor() {
      return this.profit >= 0 ? "#3CB371" : "#DC143C";
    },
  },
  created() {
    this.getMedicineData();
    this.getMedicineDataIntial();
  },
  methods: {
    toggleRowDetails(row) {
      row.toggleRowDetails();
      var index = row.initialIndex;

      if (this.expandedRow === index) {
        this.expandedRow = null;
        this.selectManufacturer = null;
        this.selectedMedicineName = null;
      } else {
        this.expandedRow = index;
        this.selectedMedicineName = row.itemKey.药品名称;
        this.selectManufacturer = row.itemKey.制药公司;
      }
    },
    getFolder(rowData) {
      console.log(
        this.selectedMedicineName,
        rowData.药品名称,
        rowData.制药公司 == this.selectManufacturer
      );
      console.log(rowData.药品名称, rowData.制药公司);
      return (
        rowData.药品名称 === this.selectedMedicineName &&
        rowData.制药公司 === this.selectManufacturer
      );
    },
    getMedicineData() {
      var self = this;
      axios
        .get("http://124.223.143.21/api/Medicine/GetMedicineStatistics")
        .then(function (response) {
          self.purchaseStatistics = response.data.purchaseStatistics;
          self.sellStatistics = response.data.sellStatistics;
          console.log(self.purchaseStatistics, self.sellStatistics);

          var items = [];

          self.purchaseStatistics.forEach(function (purchaseItem) {
            var sellItemMatched = self.sellStatistics.find(function (sellItem) {
              return (
                purchaseItem.medicineName === sellItem.medicineName &&
                purchaseItem.manufacturer === sellItem.manufacturer &&
                purchaseItem.year === sellItem.year &&
                purchaseItem.month === sellItem.month
              );
            });

            var item = {
              medicineName: purchaseItem.medicineName,
              manufacturer: purchaseItem.manufacturer,
              year: purchaseItem.year,
              month: purchaseItem.month,
              purchaseAmount: purchaseItem.purchaseAmount,
              purchaseCost: purchaseItem.purchaseCost,
              sellAmount: sellItemMatched ? sellItemMatched.sellAmount : 0,
              sellIncome: sellItemMatched ? sellItemMatched.sellIncome : 0,
            };
            items.push(item);
          });

          self.sellStatistics.forEach(function (sellItem) {
            var purchaseItemMatched = self.purchaseStatistics.find(function (
              purchaseItem
            ) {
              return (
                purchaseItem.medicineName === sellItem.medicineName &&
                purchaseItem.manufacturer === sellItem.manufacturer &&
                purchaseItem.year === sellItem.year &&
                purchaseItem.month === sellItem.month
              );
            });

            if (!purchaseItemMatched) {
              var item = {
                medicineName: sellItem.medicineName,
                manufacturer: sellItem.manufacturer,
                year: sellItem.year,
                month: sellItem.month,
                purchaseAmount: 0,
                purchaseCost: 0,
                sellAmount: sellItem.sellAmount,
                sellIncome: sellItem.sellIncome,
              };
              items.push(item);
            }
          });

          items.forEach(function (item) {
            self.timeline.push({
              name: item.medicineName,
              manufacturer: item.manufacturer,
              date: `${item.year}-${
                item.month < 10 ? "0" + item.month : item.month
              }`, // YYYY-MM format
              purchaseAmount: item.purchaseAmount,
              purchaseCost: item.purchaseCost,
              sellAmount: item.sellAmount,
              sellIncome: item.sellIncome,
            });
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getMedicineDataIntial() {
      var self = this;
      axios
        .get("http://124.223.143.21/api/Medicine/GetMedicineStatistics")
        .then(function (response) {
          self.purchaseStatistics = response.data.purchaseStatistics;
          self.sellStatistics = response.data.sellStatistics;
          console.log(self.purchaseStatistics, self.sellStatistics);

          var aggregatedData = [];

          self.purchaseStatistics.forEach(function (purchaseItem) {
            var item = aggregatedData.find(
              (item) =>
                item.medicineName === purchaseItem.medicineName &&
                item.manufacturer === purchaseItem.manufacturer
            );

            if (item) {
              item.purchaseAmount += purchaseItem.purchaseAmount;
              item.purchaseCost += purchaseItem.purchaseCost;
            } else {
              aggregatedData.push({
                medicineName: purchaseItem.medicineName,
                manufacturer: purchaseItem.manufacturer,
                purchaseAmount: purchaseItem.purchaseAmount,
                purchaseCost: purchaseItem.purchaseCost,
                sellAmount: 0,
                sellIncome: 0,
              });
            }
          });

          self.sellStatistics.forEach(function (sellItem) {
            var item = aggregatedData.find(
              (item) =>
                item.medicineName === sellItem.medicineName &&
                item.manufacturer === sellItem.manufacturer
            );

            if (item) {
              item.sellAmount += sellItem.sellAmount;
              item.sellIncome += sellItem.sellIncome;
            } else {
              aggregatedData.push({
                medicineName: sellItem.medicineName,
                manufacturer: sellItem.manufacturer,
                purchaseAmount: 0,
                purchaseCost: 0,
                sellAmount: sellItem.sellAmount,
                sellIncome: sellItem.sellIncome,
              });
            }
          });

          aggregatedData.forEach(function (item) {
            self.items.push({
              药品名称: item.medicineName,
              制药公司: item.manufacturer,
              采购量: item.purchaseAmount,
              采购金额: item.purchaseCost,
              销售量: item.sellAmount,
              销售金额: item.sellIncome,
            });
            self.totIncome += item.sellIncome;
            self.totOutcome += item.purchaseCost;
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getTimelineData(rowData) {
      const temp = this.timeline.filter(
        (item) =>
          item.manufacturer === rowData.制药公司 &&
          item.name === rowData.药品名称
      );

      // Sort temp array by date
      temp.sort((a, b) => new Date(a.date) - new Date(b.date));

      var data = [];
      temp.forEach(function (item) {
        data.push({
          date: item.date,
          sellIncome: item.sellIncome,
          purchaseCost: item.purchaseCost,
          difference: item.sellIncome - item.purchaseCost,
        });
      });
      console.log(data);

      this.$nextTick(() => {
        var chartDom = document.getElementById("chart");
        if (chartDom) {
          // 初始化图表
          var myChart = echarts.init(chartDom);
          // 设置图表选项
          var option = {
            legend: {
              data: ["采购金额", "销售金额", "营收"],
            },
            tooltip: {},
            xAxis: {
              type: "category",
              data: data.map((item) => item.date),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "采购金额",
                data: data.map((item) => item.purchaseCost),
                type: "bar",
                itemStyle: {
                  color: "#83bff6",
                },
              },
              {
                name: "销售金额",
                data: data.map((item) => item.sellIncome),
                type: "bar",
                itemStyle: {
                  color: "#188df0",
                },
              },

              {
                name: "营收",
                data: data.map((item) => item.difference),
                type: "line",
                itemStyle: {
                  color: "rgb(0, 47, 176)",
                },
              },
            ],
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 100,
              },
              {
                start: 0,
                end: 10,
              },
            ],
          };
          myChart.setOption(option);
        }
      });
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 5vh;
  text-align: center;
  margin-top: 10px;
}
.cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 18px;
}
.card {
  width: 200px;
}
.operator {
  font-size: 2em;
  padding: 0 10px;
  color: rgb(0, 47, 176);
}
.table {
  width: 90vw;
  margin-top: 20px;
  margin-left: 5vw;
  text-align: center;
  --va-data-table-no-data-text-align: center;
}
.graph {
  margin-left: 25vw;
  background-color: rgb(250, 250, 250);
  margin-right: 20vw;
}
.va-data-table__table-tr--expanded td {
  background: var(--va-background-border);
}

.va-data-table__table-expanded-content td {
  background-color: var(--va-background-element);
}
</style>