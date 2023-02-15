import { computed } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "./routeConfig";
import useStore from "@/store";
import user from "@/store/modules/user";
import { isExternal } from "@/utils";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,
});
router.beforeEach(async (to, from, next) => {
  // const tabsOption = store.getters["tabModule/getTabsOption"];
  // 判断当前路由中是否已经入栈
  // const flag =
  //   tabsOption.findIndex((tab: { route: string }) => tab.route === to.path) >
  //   -1;
  // if (!flag && !to.meta.hiddenTab) {
  //   store.commit("tabModule/ADD_TAB", {
  //     route: to.path,
  //     title: to.meta.title,
  //     name: to.name,
  //   });
  // }

  // store.commit("tabModule/SET_TAB", to.path);

  if (sessionStorage.getItem("auth")) {
    const { userPermisssion, menuPermission, appPermisssion } = useStore();
    const userInfo = userPermisssion.userInfo;

    if (!userInfo.name) {
      await userPermisssion.getUserInfo();
      // 初始化菜单
      menuPermission.getMenus();
      menuPermission.allMenus.forEach((route: RouteRecordRaw) => {
        const routeName: any = route.name;
        if (!router.hasRoute(routeName)) {
          router.addRoute(route);
        }
      });
      // 不使用 next() 是因为，在执行完 router.addRoute 后，
      // 原本的路由表内还没有添加进去的路由，会 No match
      // replace 使路由从新进入一遍，进行匹配即可
      next({ ...to, replace: true });
    } else {
      // 如果是外链，路由，菜单都返回
      const activeMenu = computed(() => appPermisssion.activeMenu);
      if (isExternal(activeMenu.value)) {
        appPermisssion.setMenu(from.path);
        next({ path: from.path });
      } else {
        next();
      }
    }
  } else if (to.path === "/login") {
    next();
  } else {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});

export default router;
