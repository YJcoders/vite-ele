<template>
  <div class="board-left">
    <div class="static border-box">
      <div class="title-box">
        <span class="box-title">销量</span>
      </div>
      <div class="box">
        <div class="desc">当日销售 (吨)</div>
        <div class="title">
          {{
            String(saleData.currentSales).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </div>
      </div>
      <div class="line-set-box">
        <div class="line-set"></div>
      </div>
      <div class="set-flex">
        <div class="sales-text-box">
          <div class="sales-text-box-top">本月销量（吨）</div>
          <div class="sales-text-box-txt">
            {{
              String(saleData.monthSales).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
          <div class="sales-text-box-bottom">
            <span class="marginR">同比</span>
            <span :class="{ 'set-red': saleData.tb < 0 }"
              >{{ saleData.tb }}%</span
            >
            <img
              :src="setImg(saleData.tb)"
              alt=""
              class="icon-set marginR-center"
            />
            <span class="marginR">环比</span>
            <span :class="{ 'set-red': saleData.hb < 0 }"
              >{{ saleData.hb }}%</span
            >
            <img
              :src="setImg(saleData.hb)"
              alt=""
              class="icon-set icon-margintop"
            />
          </div>
        </div>
        <div class="sales-echart-box">
          <div id="circle1Dom" class="set-echart circle-chart"></div>
        </div>
      </div>
      <div class="line-set-box">
        <div class="line-set"></div>
      </div>
      <div class="set-flex">
        <div class="sales-text-box">
          <div class="sales-text-box-top">年累计销量（吨）</div>
          <div class="sales-text-box-txt">
            {{
              String(saleData.yearSales).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
          <div class="sales-text-box-bottom">
            <span class="marginR">同比</span>
            <span :class="{ 'set-red': saleData.yearTb < 0 }"
              >{{ saleData.yearTb }}%</span
            >
            <img
              :src="setImg(saleData.tb)"
              alt=""
              class="icon-set marginR-center"
            />
            <span class="marginR">环比</span>
            <span :class="{ 'set-red': saleData.yearHb < 0 }"
              >{{ saleData.yearHb }}%</span
            >
            <img
              :src="setImg(saleData.hb)"
              alt=""
              class="icon-set icon-margintop"
            />
          </div>
        </div>
        <div class="sales-echart-box">
          <div id="circle2Dom" class="set-echart circle-chart"></div>
        </div>
      </div>
    </div>

    <div class="bottom-box border-box">
      <div class="title-box">
        <span class="box-title">销量趋势</span>
      </div>
      <div class="pie">
        <lineChart :params="lineParams" class="set-echart"></lineChart>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue";
import * as echarts from "echarts";

import lineChart from "./components/lineChart.vue";
import lineData from "./mock/lineData";
import type { SaleData, LineChartData } from "./types";

let monthRate = ref(0); // 月度完成率
let yearRate = ref(0); // 年度完成率
// 折线图数据
let lineParams = ref<LineChartData>();
// 环形图
const props = defineProps(["province"]);
let saleData = ref<SaleData>();
let option1 = ref<any>({});
let option2 = ref<any>({});
let circle1Chart: any;
let circle2Chart: any;
const init = () => {
  option1.value = {
    title: [
      {
        text: `${monthRate.value}%`,
        x: "center",
        top: "35%",
        textStyle: {
          fontSize: 16,
          fontWeight: "bolder",
          color: "#fff",
        },
      },
      {
        text: "当月完成率",
        x: "center",
        top: "52%",
        textStyle: {
          fontSize: 10,
          color: "#fff",
        },
      },
    ],
    polar: {
      radius: ["65%", "85%"],
      center: ["50%", "50%"],
    },
    angleAxis: {
      max: 100,
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        roundCap: true,
        barWidth: 30,
        showBackground: true,
        // backgroundStyle: {
        //   color: ""
        // },
        coordinateSystem: "polar",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#FFD400",
              },
              {
                offset: 1,
                color: "#0095FF",
              },
            ]),
          },
        },
        data: [monthRate.value],
      },
    ],
  };
  nextTick(() => {
    const circle1: HTMLElement = document.getElementById(
      "circle1Dom"
    ) as HTMLElement;
    if (!circle1Chart) circle1Chart = echarts.init(circle1);
    circle1Chart.setOption(option1.value);

    option2.value = JSON.parse(JSON.stringify(option1.value));
    option2.value.title[0].text = `${yearRate.value}%`;
    option2.value.title[1].text = "完成率";
    option2.value.series[0].data = [yearRate.value];
    const circle2: HTMLElement = document.getElementById(
      "circle2Dom"
    ) as HTMLElement;
    if (!circle2Chart) circle2Chart = echarts.init(circle2);
    circle2Chart.setOption(option2.value);
  });
};
watch(
  () => props.province,
  (val) => {
    const data = lineData[val as keyof typeof lineData];
    if (data) {
      // 销量  环形图，完成率数据, 取11月份数据
      saleData.value = {
        currentSales: data.currentSales,
        yearSales: data.yearSales,
        monthSales: data.yaxisData2[10], // 取11月份数据 最后一位的数据
        tb: data.tb[10], //  月度
        hb: data.hb[10], //  月度
        yearTb: data.yearTb, //  年度
        yearHb: data.yearHb, //  年度
      };
      // 总部 月度目标10000  年度目标  11000
      // 各省 月度目标500  年度目标  6000
      const month = val == "all" ? 10000 : 500;
      const year = val == "all" ? 110000 : 6000;
      monthRate.value = Number(
        ((data.yaxisData2[10] / month) * 100).toFixed(2)
      );
      yearRate.value = Number(((data.yearSales / year) * 100).toFixed(2));
      init();

      // 折线图数据
      lineParams.value = {
        yaxisData1: data.yaxisData1,
        yaxisData2: data.yaxisData2,
        tb: data.tb,
        hb: data.hb,
      };
    }
  },
  { immediate: true }
);

const setImg = (val: number) => {
  if (val > 0) return new URL("./images/up.png", import.meta.url).href;
  return new URL("./images/down.png", import.meta.url).href;
};
</script>

<style lang="less" scoped>
.board-left {
  //   margin: 24px 0;
  color: #fff;
  height: 100%;
  .border-box {
    position: relative;
    margin-bottom: 1rem;
    border-radius: 4px;
    opacity: 1;
    background: rgba(0, 44, 120, 0.08);
    box-sizing: border-box;
    border: 1px solid #0658c4;
    backdrop-filter: blur(24px);
  }
  .static {
    // height: 40vh;
    padding: 0 1.5rem 1rem;
    // overflow-y: scroll;
    .img {
      position: absolute;
      top: 8px;
      right: 10px;
      cursor: pointer;
    }
    .title {
      font-size: 2.875rem;
      line-height: 2.875rem;
      margin-top: 0.5rem;
    }
    .desc {
      font-size: 1rem;
    }
    .box {
      width: 100%;
      padding: 1.5rem 1.5rem 0 1.5rem;
      text-align: center;
    }

    .sales-text-box {
      flex: 1;
      font-size: 1rem;
      .sales-text-box-top {
        // margin-top: 1.5rem;
      }
      .sales-text-box-txt {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
        margin: 1rem 0;
      }
      .sales-text-box-bottom {
        // margin-bottom: 1.75rem;
        font-size: 1rem;
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
      .marginR {
        margin-right: 0.5rem;
      }
      .set-red {
        color: #ff5100;
      }
      .marginR-center {
        margin-right: 1.5rem;
      }
    }
    .sales-echart-box {
      width: 7.5rem;
      height: 7.5rem;
    }
    .set-echart {
      width: 100%;
      height: 100%;
    }

    .circle-chart {
      :deep(canvas) {
        cursor: default;
      }
    }
  }
  .bottom-box {
    height: calc(100% - 32rem);
    .pie {
      height: 100%;
      padding: 1.5rem;
      .set-echart {
        width: 100%;
        height: calc(100% - 2.5rem);
      }
    }
  }
}

.line-set-box {
  margin: 0 1.5rem;
  .line-set {
    width: 100%;
    height: 0.5rem;
    margin: 1.25rem 0;
    opacity: 1;
    background: radial-gradient(
      50% 50% at 50% 50%,
      #1377eb 0%,
      rgba(19, 119, 235, 0) 100%
    );
  }
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
  //   border-bottom: 1px solid pink;
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
</style>
