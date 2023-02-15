<template>
  <section class="app-main">
    <!-- <el-tabs id="Tabs" v-model="currentIndex" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane v-for="item in tabsOption" :key="item.route" :closable="item.route !== '/home'" :label="item.title[lang]" :name="item.route" />
    </el-tabs> -->
    <!-- <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- <keep-alive> -->
        <component :is="Component" :key="$route.path" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import useStore from "@/store";

// store 中获取当前路由以及所有的路由对象；
const store = useStore();
// const tabsOption = computed(() => store.getters['tabModule/getTabsOption'])
// const currentIndex = computed(() => store.getters['tabModule/getCurrentIndex'])
// const lang = computed(() => store.getters['settingsModule/getLangState'])

const router = useRouter();
// mothods
/**
 * @description 移除tab
 * */
// const removeTab = (tabName: string) => {
//   if (tabName === '/home') {
//     return
//   }
//   store.commit('tabModule/DELETE_TAB', tabName)
//   if (currentIndex.value === tabName) {
//     if (tabsOption.value && tabsOption.value.length) {
//       store.commit('tabModule/SET_TAB', tabsOption.value[tabsOption.value.length - 1].route)
//       router.replace({ path: currentIndex.value })
//     } else {
//       router.replace({ path: '/' })
//     }
//   }
// }
/**
 * @description 点击tab
 */
// const clickTab = (tabName: { paneName: string }) => {
//   // eslint-disable-next-line no-console
//   store.commit('tabModule/SET_TAB', tabName.paneName)
//   router.replace({ path: currentIndex.value })
// }
</script>
<style lang="less" scoped>
.app-main {
  /*50 = navbar  */
  width: 100%;
  min-height: calc(100vh - 36px);
  position: relative;
  overflow: hidden;
  background-color: @bgColor;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
