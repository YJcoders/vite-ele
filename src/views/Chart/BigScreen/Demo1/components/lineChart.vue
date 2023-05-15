<template>
  <div :id="lineChartId" class="set-echart sale-chart"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import type { LineChartData } from "../types";
import { debounce } from "@/utils";

const props = defineProps({
  lineChartId: {
    type: String,
    default: "lineChart",
  },
  params: Object,
  xData: {
    type: Array,
    default: () => {
      return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
    },
  },
});

let lineChart: any;
const init = (lineData: LineChartData) => {
  let option = ref<any>({});
  nextTick(() => {
    option.value = {
      grid: {
        // top: "25%",
        left: "2%",
        right: "3%",
        bottom: "1%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        padding: 0,
        //   backgroundColor: "",
        borderRadius: 4,
        opacity: 1,
        textStyle: {
          fontSize: 16,
          color: "#fff",
          fontFamily: "PangMenZhengDao",
        },
        formatter: (params: any) => {
          //   console.log(params);
          const data = params[0];
          const tipHtml = ` <div class="map-tip">
                                <div class="header title">${data.name}</div>
                                <div class="title set-flex">
                                    <div>当月销量</div>
                                    ${String(data.value).replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}吨
                                </div>
                                <div class="title set-flex">
                                    <div>销量同比${
                                      lineData.tb[data.dataIndex] < 0
                                        ? "下降"
                                        : "上涨"
                                    }</div>
                                    ${
                                      data.dataIndex == 11
                                        ? 0
                                        : lineData.tb[data.dataIndex]
                                    }%
                                </div>
                                <div class="title set-flex">
                                    <div>销量环比${
                                      lineData.hb[data.dataIndex] < 0
                                        ? "下降"
                                        : "上涨"
                                    }</div>
                                    ${
                                      data.dataIndex == 11
                                        ? 0
                                        : lineData.hb[data.dataIndex]
                                    }%
                                </div>
                              </div>`;
          return tipHtml;
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#466166",
          },
        },
      },
      legend: {
        orient: "horizontal",
        //   top: 10,
        right: "3%",
        itemWidth: 20,
        itemHeight: 8,
        //   icon: "react",
        itemGap: 20,
        align: "left",
        textStyle: {
          color: "rgba(255, 255, 255, 0.68)",
          fontSize: 12,
          fontFamily: "AlibabaPuHuiTi-Medium",
        },
      },
      xAxis: {
        data: props.xData,
        boundaryGap: true,
        axisLine: {
          show: true,
          // symbol: ["none", "rect"],
          symbolSize: [6, 12],
          lineStyle: {
            width: 1,
            color: "rgba(70, 97, 102, 1)",
          },
        },
        axisTick: {
          show: true,
          interval: 0,
          alignWithLabel: true,
        },
        axisLabel: {
          color: "#84A4AA",
        },
      },
      yAxis: {
        name: "单位：吨",
        nameTextStyle: {
          color: "#84A4AA",
          fontWeight: 400,
          fontSize: 12,
          //   align: "right",
          padding: [0, 18, 2, 0],
        },
        axisLabel: {
          color: "#84A4AA",
        },
        axisLine: {
          show: true,
          // symbol: ["none", "rect"],
          symbolSize: [6, 12],
          lineStyle: {
            width: 1,
            color: "rgba(70, 97, 102, 1)",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(132, 164, 170, 0.24)",
            type: "dotted",
          },
        },
      },
      series: [
        {
          name: "本期",
          data: lineData.yaxisData2,
          type: "line",
          symbol: "circle",
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            color: "#00CCF4",
            shadowColor: "#00CCF4",
            shadowBlur: 10,
            borderColor: "#00CCF4",
            borderWidth: 3,
            lineStyle: {
              color: "#00CCF4",
            },
          },
        },
        {
          name: "同期",
          data: lineData.yaxisData1,
          type: "line",
          symbol: "circle",
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            color: "#FFC300",
            shadowColor: "#FFC300",
            shadowBlur: 10,
            borderColor: "#FFC300",
            borderWidth: 3,
            lineStyle: {
              color: "#FFC300",
            },
          },
        },
      ],
    };
    const chart: HTMLElement = document.getElementById(
      props.lineChartId
    ) as HTMLElement;
    console.log(lineChart, "lineChart");
    if (!lineChart) lineChart = echarts.init(chart);
    lineChart.setOption(option.value);
  });
};
watch(
  () => props.params,
  (data) => {
    init(data as LineChartData);
  },
  { immediate: true, deep: true }
);

const resizeHandle = debounce(() => {
  lineChart && lineChart.resize();
}, 200);
onMounted(() => {
  window.addEventListener("resize", resizeHandle);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandle);
});
</script>

<style lang="less" scoped>
.set-echart {
  width: 100%;
  height: 100%;
  background-image: url("../images/echartRect.png");
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 100% 100%;
  //   height: 20vh;
}
.sale-chart {
  :deep(.map-tip) {
    width: 11.25rem;
    height: 8.5rem;
    padding: 0.75rem 0;
    border-radius: 0.25rem;
    border: 1px solid #1377eb;
    color: #fff;
    font-size: 0.75rem;
    background: rgba(1, 41, 107);
    .title {
      margin-top: 0.75rem;
      line-height: 1rem;
      padding: 0 0.75rem;
    }
    .header {
      margin-top: 0.5rem;
    }
  }
}
</style>
