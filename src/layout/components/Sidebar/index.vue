<template>
  <div class="sidebar-container" :class="{ 'collapse-width': isCollapse }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :unique-opened="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
        class="el-menu-vertical"
        text-color="#fff"
        @select="onSelect"
      >
        <!--递归路由对象-->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :menu="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>

    <el-icon class="fold" @click="onFold"
      ><Expand v-if="isCollapse" /> <Fold v-else />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
// import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
// import logo from './Logo.vue'
import useStore from "@/store";
const { menuPermission, appPermisssion } = useStore();
// const showLogo = computed(() => store.state.settingsModule.sideBarLogo)

const routes = menuPermission.allMenus;
const route = useRoute();
appPermisssion.setMenu(route.path);

const activeMenu = computed(() => appPermisssion.activeMenu);
const onSelect = (menu: string) => {
  appPermisssion.setMenu(menu);
};

const isCollapse = computed(() => appPermisssion.isCollapse);
const onFold = () => {
  appPermisssion.setFold(!isCollapse.value);
};
</script>
