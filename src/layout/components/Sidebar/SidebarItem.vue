<template>
  <div v-if="menu.meta && !menu.meta.hidden" class="menu-wrapper">
    <!--only on child show el-menu -->
    <template v-if="hasOneShowingChild(menu.children, menu)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <template #title>
            <div class="menu-title">
              <el-icon><component :is="onlyOneChild.meta.icon" /> </el-icon>
              <div class="title">{{ onlyOneChild.meta.title[lang] }}</div>
            </div>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(menu.path)">
      <template #title>
        <div class="menu-title">
          <el-icon><component :is="onlyOneChild.meta.icon" /></el-icon>
          <div>{{ menu.meta.title[lang] }}</div>
        </div>
      </template>
      <!--children 进行递归调用自身组件-->
      <template v-for="child in menu.children" :key="child.path">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :menu="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <template #title>
              <div class="menu-title">
                <el-icon><component :is="child.meta.icon" /> </el-icon>
                <div class="title">{{ child.meta.title[lang] }}</div>
              </div>
            </template>
          </el-menu-item>
        </app-link>
      </template>
    </el-sub-menu>
  </div>
</template>
<script setup lang="ts">
import { resolve } from "path-browserify";
import { toRef, shallowRef } from "vue";
import { isExternal } from "@/utils";
import AppLink from "./AppLink";

interface childType {
  path: string;
  name?: string;
  component: Function;
  meta: {
    title: Object;
    icon: string;
    hidden?: boolean;
    [key: string]: any;
  };
}
const props = defineProps({
  // route object
  menu: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});
// 是否只有一个孩子
const onlyOneChild = shallowRef();

// 析构获取 props 属性 basePath
const basePath = toRef(props, "basePath");
const lang = "/zh-CN";

const hasOneShowingChild = (children: childType[] = [], parent: any) => {
  // RouteRecordRaw 只能在meta中配置额外属性，过滤是否展示路由；
  const showingChildren = children.filter((menu) => {
    // 如果meta 配置隐藏该路由，则返回false;
    if (menu?.meta?.hidden) {
      return false;
    }
    //
    onlyOneChild.value = menu;
    return true;
  });

  // 判断当前路由，是否有children；
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有，则展示父级路由；
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  return resolve(basePath.value, routePath);
};
</script>
<style lang="less" scoped></style>
