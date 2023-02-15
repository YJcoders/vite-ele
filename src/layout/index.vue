<template>
  <!-- <div :class="classObj" class="app-wrapper"> -->
  <div class="app-wrapper">
    <!--backtop-->
    <!-- <el-backtop target=".app-wrapper" :visibility-height="100">
      <div
      style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
      </div>
    </el-backtop> -->

    <Sidebar class="sidebar-container" />
    <div
      class="main-container"
      :class="{ 'set-collapse': appPermisssion.isCollapse }"
    >
      <div>
        <navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useStore from "@/store";
// import useResize from "@/hooks/useResize";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";

const { appPermisssion } = useStore();
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
