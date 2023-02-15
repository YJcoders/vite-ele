<template>
  <div class="board-right">
    <!-- <border-box> -->
    <div class="static border-box">
      <div class="title-box">
        <span class="box-title">客户销量</span>
      </div>
      <div class="echart-box">
        <pieChart
          class="set-echart"
          :colorList="colorList"
          :dataList="dataList"
          @handleClick="handleClick"
        ></pieChart>
      </div>
    </div>
    <div class="border-box analysis">
      <div class="title-box">
        <span class="box-title">影响力分析</span>
      </div>
      <el-radio-group
        v-model="tabValue"
        class="el-tabs-radio-button"
        @change="onChange"
      >
        <el-radio-button v-if="province == 'all'" label="1"
          >片区</el-radio-button
        >
        <el-radio-button
          label="2"
          :style="{ width: province != 'all' ? '100%' : '50%' }"
          >营销中心</el-radio-button
        >
      </el-radio-group>

      <indexTable
        class="set-indexTable"
        :header="tableHeader"
        :tableData="tableData"
      />
    </div>
    <detail ref="detailModal" :province="province"></detail>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, shallowRef, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils";
import type { TableData } from "./types";
import lineData from "./mock/lineData";
import pieChart from "./components/pieChart.vue";
import indexTable from "./components/indexTable";
import detail from "./components/detail.vue";

const props = defineProps({
  province: {
    type: String,
    default: "all",
  },
});
const dataList = [
  { value: 2700, name: "战略客户", key: "S" },
  { value: 2250, name: "A类客户", key: "A" },
  { value: 1800, name: "B类客户", key: "B" },
  { value: 1350, name: "C类客户", key: "C" },
  { value: 900, name: "D类客户", key: "D" },
];
const colorList = ["#007BFD", "#35D8FF", "#26FD00", "#FFC300", "#FF6A00"];
const areaData = [
  {
    area: "华北区",
    affect: "-30%",
    number: "790",
    rate: "75%",
    gap: "-210",
  },
  {
    area: "华中区",
    affect: "-25%",
    number: "1,240",
    rate: "78%",
    gap: "-260",
  },
  {
    area: "华东区",
    affect: "-20%",
    number: "2,400",
    rate: "88%",
    gap: "-100",
  },
  {
    area: "华南区",
    affect: "-15%",
    number: "920",
    rate: "92%",
    gap: "-80",
  },
  {
    area: "西北区",
    affect: "-10%",
    number: "1,450",
    rate: "97%",
    gap: "-50",
  },
  {
    area: "西南区",
    affect: "-5%",
    number: "2200",
    rate: "100%",
    gap: "200",
  },
];
let tabValue = ref("1");
const tableHeader = [
  { name: "区域" },
  { name: "影响度" },
  { name: "销量(t)" },
  { name: "完成率" },
  { name: "目标差额(t)" },
];
// let tableData: TableData[] = reactive([]);
let tableData = ref([] as TableData[]);
tableData.value = areaData;

const onChange = (val: string) => {
  if (val == "1") {
    // 片区
    tableData.value = areaData;
  } else {
    // 营销中心
    const data = lineData[props.province as keyof typeof lineData];
    if (data) {
      tableData.value = data.saleTableData;
    }
  }
};

// 获取子组件
const detailModal = ref<typeof detail>(null);
const handleClick = (val: any) => {
  detailModal.value.visible = true;
  detailModal.value.dataList = val.data;
  detailModal.value.userList = dataList;
};

watch(
  () => props.province,
  (val) => {
    const data = lineData[val as keyof typeof lineData];

    tabValue.value = val == "all" ? "1" : "2";
    console.log(val, 999);
    if (val == "all") {
      tabValue.value = "1";
      tableData.value = areaData;
    } else {
      tabValue.value = "2";
      tableData.value = data ? data.saleTableData : areaData;
    }
    if (data) {
      const clientData = data.client;
      dataList.forEach((item, index) => (item.value = clientData[index]));
    }
  }
);
</script>

<style lang="less" scoped>
.board-right {
  color: #fff;
  .border-box {
    position: relative;
    // margin: 1rem 0;
    border-radius: 4px;
    margin-bottom: 1rem;
    opacity: 1;
    background: rgba(0, 44, 120, 0.08);
    box-sizing: border-box;
    border: 1px solid #0658c4;
    backdrop-filter: blur(24px);
  }
  .static {
    // height: 21.875rem;
    // min-height: 21.875rem;
    height: 45%;
    padding: 0 1.5rem;
  }
  .title-box {
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
  .echart-box {
    height: calc(100% - 2.5rem);
    .pie-echart {
      width: 100%;
      height: 100%;
    }
  }
  .analysis {
    height: calc(55% - 1rem);
    padding: 0 1.5rem;
  }
}
//tab
.el-tabs-radio-button {
  width: 100%;
  margin: 1.5rem 0 1rem 0;
}
.el-radio-button {
  width: 50%;
  text-align: center;
  :deep(.el-radio-button__inner) {
    width: 100%;
    color: #ffffff;
    background: transparent;
    border: 1px solid #0658c4;
  }
}
.el-radio-button.is-active {
  background: #0658c4;
  border-radius: 0.25rem;
}

.set-indexTable {
  height: calc(100% - 7.5rem);
}
</style>
