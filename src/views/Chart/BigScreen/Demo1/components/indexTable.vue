<template>
  <div class="basic-table">
    <div class="header row set-flex">
      <div v-for="(item, index) in props.header" :key="index" class="cell">
        {{ item.name }}
      </div>
    </div>
    <div class="body">
      <div
        v-for="(row, index) in props.tableData"
        :key="index"
        class="row set-flex"
      >
        <div v-for="(item, num) in row" :key="num" class="cell">
          <span :class="{ 'set-color': index < 3 && num == 'rate' }">{{
            item
          }}</span>
          <img
            v-if="num == 'area' && index < 3"
            :src="setImg(index)"
            alt=""
            style="margin-left: 0.3125rem"
          />
          <img
            v-if="num == 'numOne' || num == 'numTwo' ? setUp(item) : false"
            src="../images/up.png"
            alt=""
            style="margin-left: 0.3125rem; width: 0.5rem"
          />
          <img
            v-if="num == 'numOne' || num == 'numTwo' ? setDown(item) : false"
            src="../images/down.png"
            alt=""
            style="margin-left: 0.3125rem; width: 0.5rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  header: {
    type: Array,
    default: () => {
      return [
        { name: "区域" },
        { name: "影响度" },
        { name: "销量(t)" },
        { name: "完成率" },
        { name: "目标差额(t)" },
      ];
    },
  },
  tableData: {
    type: Array,
    default: () => {
      return [
        {
          area: "华东区",
          affect: "-40%",
          number: "2,100",
          rate: "84%",
          gap: "-400",
        },
        {
          area: "华中区",
          affect: "-25%",
          number: "1,250",
          rate: "83%",
          gap: "-250",
        },
        {
          area: "华北区",
          affect: "-10%",
          number: "1,400",
          rate: "93%",
          gap: "-100",
        },
        {
          area: "华南区",
          affect: "-10%",
          number: "1,400",
          rate: "93%",
          gap: "-100",
        },
        {
          area: "西南区",
          affect: "-10%",
          number: "1,400",
          rate: "93%",
          gap: "-100",
        },
        {
          area: "西北区",
          affect: "-5%",
          number: "1,450",
          rate: "97%",
          gap: "-50",
        },
        // {
        //   area: "西北一区",
        //   affect: "1.18%",
        //   number: 100,
        //   rate: "10%",
        //   gap: "-1490"
        // },
        // {
        //   area: "华南二区",
        //   affect: "-2.93%",
        //   number: 30,
        //   rate: "7%",
        //   gap: "-1700"
        // }
        // {
        //   area: "华南一区",
        //   affect: "-5.66%",
        //   number: 12,
        //   rate: "2%",
        //   gap: "-2270"
        // }
      ];
    },
  },
});

const setImg = (index: number) => {
  return new URL(`../images/Vector${index + 1}.png`, import.meta.url).href;
};
const setUp = (val: string) => {
  const a = val.substring(0, 1);
  if (a == "-") {
    return false;
  } else {
    return true;
  }
};
const setDown = (val: string) => {
  const a = val.substring(0, 1);
  if (a == "-") {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="less" scoped>
.basic-table {
  //   height: calc(100% - 7.5rem);
  opacity: 0.9;
  font-size: 0.75rem;
  backdrop-filter: blur(24px);
  .row {
    line-height: 2.375rem;
  }
  .row:nth-child(even) {
    background: rgba(6, 88, 196, 0.16);
  }
  .header {
    background: rgba(6, 88, 196, 0.24);
    .cell {
      text-align: right;
    }
  }
  .cell {
    width: 4.5rem;
    padding-left: 0.75rem;
  }
  .cell:first-child {
    width: 5.5rem;
    min-width: 4.5rem;
    text-align: left;
  }
  .cell:last-child {
    width: auto;
    min-width: 7rem;
    padding-right: 1rem;
  }
  .cell:nth-child(2) {
    .set-color {
      color: rgba(255, 195, 0, 1);
    }
  }
  .cell:nth-child(4) {
    .set-color {
      color: rgba(255, 81, 0, 1);
    }
  }
  .body .cell:nth-child(n + 2) {
    text-align: right;
  }
  .body {
    height: calc(100% - 2.375rem);
    overflow: auto;
  }

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(102, 184, 255, 0.8);
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(0, 44, 120, 0.8);
  }
}
</style>
