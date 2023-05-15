<template>
  <el-drawer
    v-model="visible"
    size="100%"
    :with-header="false"
    :show-close="true"
    :destroyOnClose="true"
    direction="left"
    custom-class="model-drawer"
  >
    <div class="title-box set-flex">
      <div>
        <div>客户销量详情：</div>
        <div>
          <el-select
            v-model="user"
            class="client-select"
            :allowClear="false"
            popper-class="dropdown-set"
            @change="handleChange"
          >
            <el-option
              :value="item.name"
              v-for="(item, index) in userList"
              :key="index"
              >{{ item.name }}</el-option
            >
          </el-select>
        </div>
      </div>

      <el-button
        icon="close"
        text
        class="btn-delete"
        @click="visible = false"
      />
    </div>
    <div class="main-content">
      <div class="main-content-top-box">
        <div
          class="main-content-top border-box"
          v-for="(item, index) in saleList.headerData"
          :key="index"
        >
          <div>{{ item.title }}</div>
          <div class="fontW">{{ item.count }}</div>
          <div>
            <span class="marginR">同比</span>
            <span>{{ item.top }}%</span>
            <img
              v-if="item.top > 0"
              src="../images/up.png"
              alt=""
              class="icon-set marginR-center"
            />
            <img
              v-else
              src="../images/down.png"
              alt=""
              class="icon-set marginR-center"
            />
            <span class="marginR">环比</span>
            <span>{{ item.down }}%</span>
            <img
              v-if="item.down > 0"
              src="../images/up.png"
              alt=""
              class="icon-set icon-margintop"
            />
            <img
              v-else
              src="../images/down.png"
              alt=""
              class="icon-set icon-margintop"
            />
          </div>
        </div>
      </div>
      <div class="main-content-center">
        <div class="border-box center-left-box">
          <div class="item-title">
            <span class="box-title">销量趋势</span>
          </div>
          <div class="line-chart">
            <lineChart
              :params="lineParams"
              lineChartId="lineChartId"
              class="set-echart"
            ></lineChart>
          </div>
        </div>
        <div class="border-box center-right-box">
          <div class="item-title">
            <span class="box-title">各片区分布</span>
          </div>
          <indexTable
            class="dis-indexTable"
            :header="disHeader"
            :tableData="disTableData"
          />
        </div>
      </div>
      <div class="main-content-center main-content-bottom">
        <div class="border-box center-left-box">
          <div class="item-title">
            <span class="box-title" tabindex="3" id="flow">流量预警</span>
          </div>
          <div class="pieChart-box">
            <pieChart
              class="set-pieChart"
              :dataList="pieDataList"
              pieChartId="pieChartId"
            ></pieChart>
          </div>
        </div>
        <div class="border-box center-right-box">
          <div class="item-title">
            <span class="box-title">各片区客户流失预警</span>
          </div>
          <indexTable
            class="set-indexTable"
            :header="userHeader"
            :tableData="userTableData"
          />
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from "vue";
import lineChart from "./lineChart.vue";
import indexTable from "./indexTable";
import pieChart from "./pieChart.vue";
import clientData from "../mock/clientData";
import clientProvinceData from "../mock/clientProvinceData";
import type { LineChartData } from "./types";

const props = defineProps({
  province: {
    type: String,
    default: "all",
  },
});
const visible = ref(false);

let user = ref("");
let dataList = { value: 2700, name: "战略客户", value1: "2,700", key: "S" };
let saleList = ref<any>({});
const userList = [
  { value: 2700, name: "战略客户", value1: "2,700", key: "S" },
  { value: 2250, name: "A类客户", value1: "2,250", key: "A" },
  { value: 1800, name: "B类客户", value1: "1,800", key: "B" },
  { value: 1350, name: "C类客户", value1: "1,350", key: "C" },
  { value: 900, name: "D类客户", value1: "900", key: "D" },
];
defineExpose({
  visible,
  dataList,
  userList,
});

let lineParams = ref<LineChartData>();
let pieDataList = ref([]);

const userHeader = [
  { name: "片区" },
  { name: "高风险流失预警客户数" },
  { name: "中风险流失预警客户数" },
  { name: "低风险流失预警客户数" },
];
let userTableData = ref([]);
const disHeader = [
  { name: "片区" },
  { name: "客户数" },
  { name: "本月销量(吨)" },
  { name: "销量同比" },
  { name: "销量环比" },
  { name: "环比降量客户数" },
];
let disTableData = ref([]);

const setTotal = (val: Array<any>) => {
  let top = 0;
  let mid = 0;
  let low = 0;
  val.forEach((item) => {
    top = top + Number(item.height);
    mid = mid + item.number;
    low = low + item.lower;
  });
  return [
    {
      value: top,
      name: "高风险",
    },
    { value: mid, name: "中风险" },
    { value: low, name: "低风险" },
  ];
};
const handleChange = (val: string) => {
  user.value = val;
  const index = userList.findIndex((item) => item.name == val);
  if (index > -1) {
    dataList = userList[index];
    // 总部和未做数据的省份，，使用统一数据
    const provinceData =
      clientProvinceData[props.province as keyof typeof clientProvinceData];
    saleList.value =
      props.province == "all" || !provinceData
        ? clientData[dataList.key as keyof typeof clientData]
        : provinceData;

    disTableData.value = saleList.value.areaData;
    userTableData.value = saleList.value.warnData;
    pieDataList.value = setTotal(saleList.value.warnData);
    console.log(pieDataList, "pieDataList");

    // 折线图数据
    lineParams.value = {
      yaxisData1: saleList.value.lineData.yaxisData1,
      yaxisData2: saleList.value.lineData.yaxisData2,
      tb: saleList.value.lineData.tb,
      hb: saleList.value.lineData.hb,
    };
  }

  // 解决，下拉框失焦
  const dom = document.getElementById("flow");
  if (dom) dom.focus();
};
watch(visible, (val) => {
  if (val) {
    user.value = dataList.name;
    handleChange(user.value);
  }
});
</script>

<style lang="less">
.model-drawer {
  width: 70%;
  .el-drawer__body {
    padding: 0;
    background: #011b52;
  }
  .title-box {
    height: 4.2rem;
    line-height: 4.2rem;
    padding-left: 2.5rem;
    font-size: 1.25rem;
    background: linear-gradient(0deg, #003f9e 0%, #001b52 100%);
    box-shadow: 0px 4px 16px 0px rgba(0, 27, 82, 0.4);
    display: flex;

    .client-select {
      width: 12rem;
      .el-input__wrapper {
        background: transparent;
        box-shadow: 0 0 0 1px #0658c4 inset !important;
      }
      .el-input__inner {
        color: #fff;
      }
    }

    .btn-delete {
      min-width: unset;
      color: #8894a8;
      position: absolute;
      right: 0.5rem;
      top: 1.25rem;
    }
    .btn-delete:hover {
      color: #fff;
      background: #0658c4;
    }
  }

  .main-content {
    padding: 1.5rem 0.5rem 1.5rem 1.5rem;
    height: calc(100vh - 4.5rem);
    .main-content-top-box {
      display: flex;
      .main-content-top {
        width: calc(33.33% - 1rem);
        padding: 1.5rem 0;
        margin-right: 1rem;
        > div {
          text-align: center;
        }
        .fontW {
          font-size: 2rem;
          font-weight: bold;
        }
        .marginR {
          margin-right: 0.5rem;
        }
        .set-red {
          color: #ff5100;
        }
        .marginR-center {
          margin-right: 1.5rem;
        }
        .icon-set {
          //   width: 0.5rem;
          width: 0.625rem;
          height: 0.625rem;
          margin-left: 0.375rem;
        }
        .icon-margintop {
          margin-top: -2px;
        }
      }
    }

    .main-content-center {
      display: flex;
      height: calc((100% - 10.8rem) / 2);
      margin-bottom: 1rem;
    }

    .center-left-box {
      width: calc(33.33% - 1rem);
      height: 100%;
      margin-right: 1rem;
      .line-chart {
        height: calc(100% - 3rem);
        padding: 1rem;
        .set-echart {
          width: 100%;
          height: 100%;
        }
      }
      .pieChart-box {
        padding: 1rem;
        height: calc(100% - 3rem);
        .set-pieChart {
          width: 100%;
          height: 100%;
        }
      }
    }
    .center-right-box {
      height: 100%;
      width: calc(66.67% - 1rem);
      .set-indexTable {
        padding: 1rem;
        height: calc(100% - 2.5rem);
      }
      .dis-indexTable {
        padding: 1rem;
        height: calc(100% - 2.5rem);
      }
    }
  }

  .border-box {
    // position: relative;
    margin-bottom: 1rem;
    border-radius: 4px;
    opacity: 1;
    background: rgba(0, 44, 120, 0.08);
    box-sizing: border-box;
    border: 1px solid #0658c4;
    backdrop-filter: blur(24px);
  }

  .main-content-bottom {
    margin-bottom: 0 !important;
    height: calc((100% - 9.8rem) / 2) !important;
    .border-box {
      margin-bottom: 0;
    }
  }

  .item-title {
    text-align: center;
  }
  .box-title {
    position: relative;
    width: 100%;
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.25rem;
    font-family: PingFangSC-Semibold;
    background: linear-gradient(
      270deg,
      rgba(6, 88, 196, 0) 0%,
      rgba(6, 88, 196, 0.16) 51%,
      rgba(6, 88, 196, 0) 100%
    );
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        270deg,
        rgba(6, 88, 196, 0) 0%,
        #0658c4 50%,
        rgba(6, 88, 196, 0) 100%
      );
    }
  }
}
.dropdown-set {
  border: none !important;

  .el-popper__arrow::before {
    background-color: #032567 !important;
    border-color: #032567 !important;
  }
}
.dropdown-set.el-select-dropdown {
  background-color: #032567;
  border: 1px solid #0658c4 !important;
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.hover {
    background: #0658c4;
  }
  .el-select-dropdown__item.selected {
    background: #0658c4;
  }
}
</style>
<style lang="less" scoped>
.dis-indexTable {
  /deep/.cell:nth-child(2) {
    .set-color {
      color: #fff;
    }
  }
  /deep/.cell:nth-child(3) {
    min-width: 9rem;
    text-align: right;
  }
  /deep/.cell:nth-child(4) {
    min-width: 6rem;
    text-align: right;
  }
  /deep/.cell:nth-child(5) {
    min-width: 6rem;
    text-align: right;
  }
  /deep/.cell:nth-child(6) {
    min-width: 9rem;
    text-align: right;
  }
}
.set-indexTable {
  .cell:first-child {
    width: auto;
    min-width: 5.5rem;
    text-align: left;
  }
  /deep/.cell:nth-child(2) {
    min-width: 12rem;
    text-align: right;
    .set-color {
      color: #fff;
    }
  }
  /deep/.cell:nth-child(3) {
    min-width: 12rem;
    text-align: right;
    .set-color {
      color: #fff;
    }
  }
  /deep/.cell:nth-child(4) {
    min-width: 12rem;
    text-align: right;
    .set-color {
      color: #fff;
    }
  }
}
</style>
