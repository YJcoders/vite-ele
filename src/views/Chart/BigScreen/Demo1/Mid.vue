<template>
  <div class="map-box">
    <div class="echart-box">
      <div
        v-show="props.province == 'all'"
        id="mapChart"
        class="set-echart map-chart"
      ></div>
      <province
        v-show="props.province != 'all'"
        :province="props.province"
        class="set-echart"
      />
      <div class="lable-box">
        <p class="lable-content">
          <span
            class="marker"
            style="background-color: #55ff00; boxshadow: 0 0 5px red"
          ></span>
          <span>当月销售量完成率 ≥ 100%</span>
        </p>
        <p class="lable-content">
          <span
            class="marker"
            style="background-color: #ffc300; boxshadow: 0 0 5px red"
          ></span>
          <span>80% ≤ 当月销售量完成率＜100% </span>
        </p>
        <p class="lable-content">
          <span
            class="marker"
            style="background-color: #ff5100; boxshadow: 0 0 5px red"
          ></span>
          <span>当月销售量完成率＜80%</span>
        </p>
      </div>
    </div>
    <div class="bottom-relative-box">
      <div class="title-box">
        <span class="box-title">归因分析</span>
      </div>
      <div v-show="props.province == 'all'" class="analysis set-flex">
        <div>
          <img src="./images/company.png" alt="" />
          分公司：<span class="label">
            山西分公司月营销差额30吨，影响力-15%
          </span>
        </div>

        <div class="btn" @click="onViewProvince">
          <span>查看</span>
        </div>
      </div>
      <div v-show="props.province == 'all'" class="line"></div>
      <div class="analysis set-flex">
        <div>
          <div>
            <img src="./images/client.png" alt="" />
            客户：<span class="label"> A类客户月营销差额50吨，影响力-15% </span>
          </div>
        </div>

        <div class="btn" @click="onViewClient">
          <span>查看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from "vue";
import province from "./province/index.vue";
import { geoJson } from "./province/chinaJson";
import * as echarts from "echarts";
import { debounce } from "@/utils";

const props = defineProps({
  province: {
    type: String,
    default: "all",
  },
});

const imgUp = new URL("./images/up.png", import.meta.url).href;
const imgDown = new URL("./images/down.png", import.meta.url).href;
let mapChart;
const seriesValueList = [
  // 一级
  {
    name: "青海",
    symbolOffset: [0, -25],
    color: "#55FF00",
    percent: { label: "当月完成率", value: "≥ 100%" },
    number: { label: "11月销量", value: "700吨" },
    tb: { label: "同比", value: 12.25 },
    hb: { label: "环比", value: 10.67 },
    value: [],
  },
  {
    name: "贵州",
    symbolOffset: [0, -22],
    color: "#55FF00",
    percent: { label: "当月完成率", value: "≥ 100%" },
    number: { label: "11月销量", value: "650吨" },
    tb: { label: "同比", value: 10.82 },
    hb: { label: "环比", value: 5.85 },
    value: [],
  },
  // 二级
  {
    name: "江西",
    symbolOffset: [0, -18],
    color: "#FFC300",
    percent: { label: "当月完成率", value: "≥ 80%" },
    number: { label: "11月销量", value: "490吨" },
    tb: { label: "同比", value: 12.18 },
    hb: { label: "环比", value: 15.65 },
    value: [],
  },
  {
    name: "广西",
    symbolOffset: [0, -18],
    color: "#FFC300",
    percent: { label: "当月完成率", value: "≥ 80%" },
    number: { label: "11月销量", value: "440吨" },
    tb: { label: "同比", value: 9.28 },
    hb: { label: "环比", value: 5.13 },
    value: [],
  },
  {
    name: "四川",
    symbolOffset: [0, -25],
    color: "#FFC300",
    percent: { label: "当月完成率", value: "≥ 80%" },
    number: { label: "11月销量", value: "430吨" },
    tb: { label: "同比", value: 5.42 },
    hb: { label: "环比", value: 2.36 },
    value: [],
  },

  // 三级
  {
    name: "湖南",
    symbolOffset: [0, -20],
    color: "#FF5100",
    percent: { label: "当月完成率", value: "＜80%" },
    number: { label: "11月销量", value: "380吨" },
    tb: { label: "同比", value: 4.82 },
    hb: { label: "环比", value: -2.66 },
    value: [],
  },
  {
    name: "安徽",
    symbolOffset: [0, -22],
    color: "#FF5100",
    percent: { label: "当月完成率", value: "＜80%" },
    number: { label: "11月销量", value: "350吨" },
    tb: { label: "同比", value: 6.65 },
    hb: { label: "环比", value: -3.14 },
    value: [],
  },
  {
    name: "山西",
    symbolOffset: [0, -22],
    color: "#FF5100",
    percent: { label: "当月完成率", value: "＜80%" },
    number: { label: "11月销量", value: "300吨" },
    tb: { label: "同比", value: -5.82 },
    hb: { label: "环比", value: -2.85 },
    value: [],
  },
];
let circleData = ref([]);
seriesValueList.forEach((item) => {
  const val = geoJson.features.filter((el) => el.properties.name == item.name);
  if (val.length) {
    item.value = val[0].properties.cp;

    const obj = {
      ...item,
      itemStyle: {
        color: item.color,
      },
    };
    circleData.value.push(obj);
  }
});
const option = ref({
  tooltip: {
    show: true,
    trigger: "item",
    padding: 0,
    enterable: true,
    transitionDuration: 1,
    formatter: function (params) {
      // console.log(params);
      const val = seriesValueList.filter((item) => item.name == params.name);
      let data = {};
      if (!val.length) return null;
      data = val[0];
      const tipHtml = ` <div class="map-tip">
                                <div class="header title">${params.name}</div>
                                <div class="line"></div>
                                <div class="title set-flex">
                                    <div>${data.percent.label}</div>
                                    ${data.percent.value}
                                </div>
                                <div class="title set-flex">
                                    <div>${data.number.label}</div>
                                    <div>${data.number.value}</div>
                                </div>
                                <div class="title set-flex">
                                    <div>${data.tb.label}</div>
                                    <div class="${
                                      data.tb.value < 0 ? "setColor" : ""
                                    }">${data.tb.value}%
                                    <img src="${
                                      data.tb.value < 0 ? imgDown : imgUp
                                    }" alt="" class="icon-caret" />
                                    </div>
                                </div>
                                <div class="title set-flex">
                                    <div>${data.hb.label}</div>
                                    <div class="${
                                      data.hb.value < 0 ? "setColor" : ""
                                    }">${data.hb.value}%
                                    <img src="${
                                      data.hb.value < 0 ? imgDown : imgUp
                                    }" alt="" class="icon-caret" />
                                    </div>
                                </div>
                              </div>`;
      return tipHtml;
    },
  },
  geo: {
    map: "china",
    scaleLimit: {
      min: 1,
      max: 2,
    },
    zoom: 1.15,
    top: "10%",
    label: {
      show: true,
      color: "#fff",
      fontSize: 14,
      emphasis: {
        color: "#fff",
      },
    },
    itemStyle: {
      normal: {
        areaColor: "#0658C4",
        borderColor: "#FFFFFF",
      },
      emphasis: {
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 68, 191, 0.3)", // 0% 处的颜色
            },
            {
              offset: 0.8,
              color: "rgba(0, 68, 191, 0.6)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    select: {
      // 选中区域的默认样式
      itemStyle: {
        areaColor: "#0658C4",
      },
      label: {
        color: "#fff",
      },
    },
  },
  xAxis: {
    type: "value",
    scale: true,
    show: false,
  },
  yAxis: {
    type: "value",
    scale: true,
    show: false,
  },
  series: [
    {
      type: "map",
      geoIndex: 0,
      data: seriesValueList,
    },
    {
      name: "高亮小圆点",
      type: "effectScatter",
      hoverAnimation: true,
      symbolSize: 12,
      label: {
        // 不显示label名字
        show: false,
      },
      itemStyle: {
        normal: {
          color: "#F4E925",
          shadowBlur: 10,
          shadowColor: "#05C3F9",
        },
      },
      coordinateSystem: "geo",
      showEffectOn: "render",
      rippleEffect: {
        brushType: "stroke",
      },
      zlevel: 1,
      data: circleData,
    },
  ],
});
nextTick(() => {
  echarts.registerMap("china", geoJson);
  const map: HTMLElement = document.getElementById("mapChart") as HTMLElement;
  if (!mapChart) mapChart = echarts.init(map);
  mapChart.setOption(option.value);
});

const resizeHandle = debounce(() => {
  mapChart && mapChart.resize();
}, 200);
onMounted(() => {
  window.addEventListener("resize", resizeHandle);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandle);
});

watch(
  () => props.province,
  (val) => {
    nextTick(() => {
      mapChart && mapChart.resize();
    });
  }
);

const onViewProvince = () => {
  // this.$emit("changeProvince", "shanxi");
};
const onViewClient = () => {
  // this.$emit("onViewClient", "A类客户");
};
</script>

<style lang="less" scoped>
.map-box {
  height: 100%;
  position: relative;
  .map-chart {
    :deep(.map-tip) {
      width: 11.25rem;
      height: 10.375rem;
      padding: 0.75rem 0;
      border-radius: 0.25rem;
      border: 1px solid #1377eb;
      color: #fff;
      font-size: 0.75rem;
      background: rgba(1, 41, 107);
      .title {
        margin-top: 0.5rem;
        line-height: 1.25rem;
        padding: 0 0.75rem;
        .icon-caret {
          width: 0.625rem;
          height: 0.625rem;
        }
      }
      .header {
        margin-bottom: 0.625rem;
        margin-top: 0;
      }
      .line {
        width: 11.25rem;
        height: 1px;
        background: linear-gradient(
          270deg,
          rgba(19, 119, 235, 0) 0%,
          #1377eb 50%,
          rgba(19, 119, 235, 0) 100%
        );
      }
      .setColor {
        color: #ff5100;
      }
    }
  }
}
.echart-box {
  width: 100%;
  position: relative;
  .set-echart {
    height: calc(100vh - 21.1rem);
    max-height: calc(100vh - 21.1rem);
    width: 100%;
  }
  .lable-box {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    .lable-content {
      position: relative;
      padding-left: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.75rem;
      line-height: 1.25rem;
      cursor: default;
      color: rgba(255, 255, 255, 0.68);
      .marker {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        position: absolute;
        bottom: -2px;
        left: -1rem;
        transform: translate(50%, -50%);
      }
    }
  }
}
.bottom-relative-box {
  width: 100%;
  min-height: 11.9rem;
  border-radius: 0.25rem;
  opacity: 1;
  background: rgba(0, 44, 120, 0.08);
  box-sizing: border-box;
  border: 1px solid #0658c4;
  backdrop-filter: blur(1.5rem);
  .title-box {
    color: #fff;
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

  .line {
    height: 0.5rem;
    background: radial-gradient(
      50% 50% at 50% 50%,
      #1377eb 0%,
      rgba(19, 119, 235, 0) 100%
    );
  }
  .analysis {
    position: relative;
    line-height: 4.375rem;
    padding: 0 1.5rem;
    font-size: 1rem;
    color: #fff;
    font-family: PingFangSC-Semibold;
    .label {
      opacity: 0.8;
      font-size: 0.9375rem;
      font-family: PingFangSC-Regular;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      margin-bottom: -0.4rem;
    }
  }
  .btn {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 0.75rem;
    line-height: 1.875rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-family: PingFangSC-Regular;
    opacity: 0.9;
    box-sizing: border-box;
    border: 1px solid #0658c4;
    background: rgba(6, 88, 196, 0.08);
    cursor: pointer;
  }
}
</style>
