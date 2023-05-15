<template>
  <div id="provice" class="set-echart"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from "vue";
import { debounce } from "@/utils";
import allData from "./data";
import * as echarts from "echarts";

const props = defineProps({
  province: {
    type: String,
    default: "chongqing",
  },
});

let provinceChart: any;
const initChinaMap = async () => {
  if (props.province == "all") return;
  const provinceMapData = await import(`./source/${props.province}.json`);
  const provinceMap = provinceMapData.default;

  let circleData: any[] = [];
  const data = allData[props.province as keyof typeof allData];
  data &&
    data.length &&
    data.forEach((item: any) => {
      const val = provinceMap.features.filter(
        (el: any) => el.properties.name == item.name
      );
      if (val.length) {
        item.value = val[0].properties.centroid;
        const obj = {
          ...item,
          itemStyle: {
            color: item.color,
          },
        };
        circleData.push(obj);
      }
    });
  const imgUp = new URL("../images/up.png", import.meta.url).href;
  const imgDown = new URL("../images/down.png", import.meta.url).href;
  let option = {
    tooltip: {
      show: true,
      trigger: "item",
      padding: 0,
      enterable: true,
      transitionDuration: 1,
      formatter: function (params: any) {
        let data = params.data || {};
        if (!data.percent) return null;
        // data = val[0];
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
      map: "province",
      roam: false,
      scaleLimit: {
        min: 1,
        max: 2,
      },
      zoom: 1.1,
      top: "5%",
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
          shadowColor: "#182f68",
          borderColor: "#66B8FF",
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
        data: data,
        itemStyle: {
          normal: {
            borderColor: "#2ab8ff",
            borderWidth: 1.5,
            areaColor: "#12235c",
          },
          emphasis: {
            areaColor: "#2AB8FF",
            borderWidth: 0,
            color: "green",
          },
        },
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
  };
  echarts.registerMap("province", provinceMap);
  const map: HTMLElement = document.getElementById("provice") as HTMLElement;
  if (!provinceChart) provinceChart = echarts.init(map);
  provinceChart.setOption(option);
};
watch(
  () => props.province,
  async () => {
    await initChinaMap();
    provinceChart && provinceChart.resize();
  }
);

const resizeHandle = debounce(() => {
  provinceChart && provinceChart.resize();
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
  :deep(.map-tip) {
    width: 11.25rem;
    height: 10.375rem;
    padding: 0.75rem 0;
    opacity: 1;
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
        margin-bottom: 0.125rem;
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
</style>
