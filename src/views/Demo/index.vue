<template>
  <div class="demo-list set-flex">
    <div class="container">
      <div class="set-line-title">监听下拉框滚动</div>
      <el-select
        v-model="selectValue"
        v-loadMore="{ className: 'popper-load', func: loadMore }"
        class="select-load"
        popper-class="popper-load"
        placeholder="Select"
      >
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const selectValue = ref(0);
interface selectType {
  label: string;
  value: number;
}
const selectList = ref([] as selectType[]);
const arr = Array(10).fill(0);
arr.forEach((item, index) => {
  selectList.value.push({ label: `zs${item}`, value: index });
});

const loadMore = (v) => {
  console.log(v, "触底");
};
</script>

<style lang="less" scoped>
.demo-list {
  padding: 1rem;
  .set-line-title {
    border: none;
    background: #fff;
    border-radius: 0.25rem;
  }
  .container {
    width: 30%;
    height: 18.75rem;
    border-radius: 0.25rem;
    background: #fff;
  }
  .container:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(153deg, #b5c327 -38%, #ffc907 49%);
    transform: translate3d(19px, 21px, 0) scale(0.86);
    filter: blur(20px);
    opacity: var(0.56);
    transition: opacity 0.3s;
    border-radius: inherit;
  }
  .select-load {
    padding: 0 1rem;
  }
}
</style>
