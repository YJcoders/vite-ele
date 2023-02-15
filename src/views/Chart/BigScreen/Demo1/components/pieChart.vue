<template>
  <div :id="pieChartId" class="set-echart"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils";

const emit = defineEmits(["handleClick"]);

const props = defineProps({
  pieChartId: {
    type: String,
    default: "pieChart",
  },
  dataList: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

let pieChart: any;
const init = () => {
  let option = ref<any>({});
  nextTick(() => {
    option.value = option.value = {
      color: ["#007BFD", "#35D8FF", "#26FD00", "#FFC300", "#FF6A00"],
      legend: {
        orient: "horizontal",
        icon: "circle", //图例形状
        //   padding: 0,
        bottom: 12,
        itemWidth: 10, //小圆点宽度
        itemHeight: 10, // 小圆点高度
        itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
          fontSize: 14,
          color: "#ffffff",
        },
      },
      series: [
        {
          type: "pie",
          center: ["50%", "46%"],
          radius: ["34%", "46%"],
          label: {
            show: true,
            position: "outside",
            padding: [0, -65],
            formatter: function (params: any) {
              return `{a|月销量${String(params.data.value).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}吨}\n{value|占比${params.percent}%}`;
            },
            rich: {
              a: {
                padding: [58, 0, 10, 20],
                color: "#FFFFFF",
              },
              value: {
                padding: [0, 0, 98, 20],
                align: "left",
                color: "#FFFFFF",
              },
            },
          },
          labelLine: {
            show: true,
            length: 8,
            length2: 70,
            lineStyle: {
              width: 1,
            },
          },
          textStyle: {
            fontSize: 12,
            //   align: "left"
          },
          data: props.dataList,
        },
      ],
    };
    const chart: HTMLElement = document.getElementById(
      props.pieChartId
    ) as HTMLElement;
    if (!pieChart) pieChart = echarts.init(chart);
    pieChart.setOption(option.value);

    pieChart.on("click", (params: any) => {
      // 获取到鼠标点击位置 ：
      emit("handleClick", params);
    });
  });
};
watch(
  () => props.dataList,
  (data) => {
    init();
  },
  { immediate: true, deep: true }
);

const resizeHandle = debounce(() => {
  pieChart && pieChart.resize();
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
}
</style>
