import { defineStore } from "pinia";
import {
  constantRoutes,
  asyncRoutes,
  notFoundPage,
} from "@/router/routeConfig";
import { deepClone } from "@/utils";

export default defineStore("menuPermission", {
  state: () => ({
    // 静态路由生成的菜单
    constantRoutes,
    // 所有路由生成的菜单（静态、动态）
    allMenus: [] as any,
    // 深拷贝
    menusTree: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  // persist: true,
  // 自定义数据持久化方式
  // persist: {
  // storage: window.localStorage, // 指定换成地址，必须
  //   // key: "menuPermission", // 指定存储key，非必须
  //   // paths: ['nested.data'],// 指定需要持久化的state的路径名称，非必须
  //   beforeRestore: (context) => {
  //     console.log("Before" + context);
  //   },
  //   afterRestore: (context) => {
  //     console.log("After" + context);
  //   },
  // },
  actions: {
    // 获取菜单
    getMenus(): void {
      this.allMenus = [...notFoundPage, ...constantRoutes, ...asyncRoutes];
      // console.log(this.allMenus, "this.allMenus");

      this.menusTree = deepClone(this.allMenus);
    },
  },
});
