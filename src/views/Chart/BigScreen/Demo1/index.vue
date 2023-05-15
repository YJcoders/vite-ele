<template>
  <div class="big-screen">
    <el-tree-select
      v-model="selectValue"
      :data="treeData"
      :render-after-expand="false"
      class="title-left"
      popper-class="popper-left"
    />
    <div class="title-box">
      <img src="./images/titleBg.png" class="title-background" />

      <span class="title-content">运 营 大 屏</span>
      <span class="title-dateTime">{{ dateTime }}</span>
    </div>

    <div class="set-flex main-box">
      <div class="gutter-col container left">
        <Left class="content" ref="boardLeft" :province="selectValue" />
      </div>
      <div class="gutter-col mid">
        <Mid
          class="content"
          ref="boardMap"
          :province="selectValue"
          @changeProvince="changeProvince"
          @onViewClient="onViewClient"
        />
      </div>
      <div class="gutter-col container left">
        <Right class="content" ref="boardRight" :province="selectValue" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount } from "vue";
import Left from "./Left.vue";
import Mid from "./Mid.vue";
import Right from "./Right.vue";

import treeData from "./mock/treeSelect";
import getInstance from "@/hooks/getInstance";
const { proxy } = getInstance();

const selectValue = ref("all");
let dateTime = ref(proxy.day(new Date()).format("YYYY-MM-DD HH:mm:ss"));
let timer = ref(0);
timer.value = setInterval(() => {
  dateTime.value = proxy.day(new Date()).format("YYYY-MM-DD HH:mm:ss");
}, 1000);
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

const changeProvince = () => {};
const onViewClient = () => {};
</script>

<style lang="less" scoped>
.big-screen {
  position: relative;
  background-image: url("./images/boardBg.png");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #001b52;
  overflow: hidden;
  min-height: 100vh;
  opacity: 1;
  .main-box {
    flex-shrink: 0;
    padding: 0rem 1.5rem 1.5rem;
    height: calc(100vh - 7.5rem);

    .gutter-col {
      height: 100%;
      .content {
        height: 100%;
      }
    }
    .container {
      width: 22%;
      min-width: 28rem;
    }
    .mid {
      width: calc(56% - 2rem);
      margin: 0 1rem;
    }
  }
}
.title-left {
  position: absolute;
  top: 1.125rem;
  left: 2.5rem;
  width: 12.5rem;
  z-index: 10;
  color: #fff;
  :deep(.el-input__wrapper) {
    background: unset;
    box-shadow: 0 0 0 1px rgba(6, 88, 196, 0.8) inset;
    .el-input__inner,
    .el-select__caret {
      color: #fff;
    }
  }
}

.title-box {
  position: relative;
  color: #fff;
  .title-background {
    width: 100%;
    height: 6.5rem;
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .title-content {
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translate(-50%, -5%);
    background-image: -webkit-gradient(
      linear,
      right top,
      right bottom,
      color-stop(0, #fff),
      color-stop(1, #b8e2ff)
    );
    color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -ms-background-clip: text;
  }
  .title-dateTime {
    position: absolute;
    font-size: 1.25rem;
    top: 1.5rem;
    right: 2.5rem;
  }
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: #001b52 !important;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #001b52 !important;
}
</style>
<style lang="less">
.popper-left {
  background: #002365 !important;
  border-color: #0658c4 !important;
  .el-tree {
    background: #002365;
    .el-select-dropdown__item {
      color: #fff;
    }
    .el-tree-node:focus > .el-tree-node__content {
      background: rgba(6, 88, 196, 0.8) !important;
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background: rgba(6, 88, 196, 0.8) !important;
    }
    .el-tree-node__content:hover {
      background: rgba(6, 88, 196, 0.8) !important;
    }
  }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(102, 184, 255, 0.8);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(0, 44, 120, 0.8);
  }
}
</style>
