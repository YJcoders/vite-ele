import layout from "@/layout/index.vue";
// 静态路由
export const constantRoutes = [
  {
    path: "/",
    component: layout,
    redirect: "/home",
    meta: {
      title: {
        "/zh-CN": "首页",
        "/en-US": "Home Page",
      },
      icon: "House",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: {
            "/zh-CN": "首页",
            "/en-US": "Home Page",
          },
          icon: "House",
        },
      },
    ],
  },
  {
    path: "/outlink",
    component: layout,
    meta: {
      title: {
        "/zh-CN": "外链",
        "/en-US": "url",
      },
      icon: "Link",
    },
    children: [
      {
        path: "https://github.com/PanJiaChen/vue-element-admin",
        meta: {
          title: {
            "/zh-CN": "外链",
            "/en-US": "url",
          },
          icon: "Link",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: {
        "/zh-CN": "登录",
        "/en-US": "Login",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
  {
    path: "/noFound",
    name: "NoFound",
    component: () => import("@/views/NoFound.vue"),
    meta: {
      title: {
        "/zh-CN": "404",
        "/en-US": "404",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
  // 此页必须要，否则，会有路由找不到警告
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/views/NoFound.vue"),
  //   meta: {
  //     title: {
  //       "/zh-CN": "未找到",
  //       "/en-US": "NOT FOUND",
  //     },
  //     hidden: true,
  //     hiddenTab: true,
  //   },
  // },
];

// 异步路由
export const asyncRoutes = [
  {
    path: "/demo",
    component: layout,
    redirect: "/demo/index",
    meta: {
      title: {
        "/zh-CN": "Demos",
        "/en-US": "Demos",
      },
      icon: "Document",
    },
    children: [
      {
        path: "/demo/index",
        name: "Demo",
        component: () => import("@/views/Demo/index.vue"),
        meta: {
          title: {
            "/zh-CN": "demo",
            "/en-US": "demo",
          },
          icon: "Document",
        },
      },
    ],
  },
  {
    path: "/form",
    component: layout,
    redirect: "/form/formInfo",
    meta: {
      title: {
        "/zh-CN": "表单",
        "/en-US": "Form",
      },
      icon: "Document",
    },
    children: [
      {
        path: "/form/formInfo",
        name: "FormInfo",
        component: () => import("@/views/Form/formInfo.vue"),
        meta: {
          title: {
            "/zh-CN": "基础表单",
            "/en-US": "Basic Form",
          },
          icon: "Edit",
        },
      },
      {
        path: "/form/stepForm",
        name: "StepForm",
        component: () => import("@/views/Form/stepForm.vue"),
        meta: {
          title: {
            "/zh-CN": "分步表单",
            "/en-US": "Step Form",
          },
          icon: "Notebook",
        },
      },
      // {
      //   path: "/form/advanceForm",
      //   name: "advanceForm",
      //   component: () =>
      //     import(
      //       "@/views/Form/advanceForm.vue"
      //     ),
      //   meta: {
      //     title: {
      //       "/zh-CN": "高级表单",
      //       "/en-US": "Advance Form",
      //     },
      //     icon: "ic ic-stealth-fill",
      //   },
      // },
    ],
  },
  {
    path: "/dataservice",
    component: layout,
    redirect: "/dataservice/app-list",
    meta: {
      title: {
        "/zh-CN": "数据服务",
        "/en-US": "Form",
      },
      icon: "Document",
    },
    children: [
      {
        path: "/dataservice/app-list",
        name: "AppList",
        component: () => import("@/views/Dataservice/AppList/index.vue"),
        meta: {
          title: {
            "/zh-CN": "服务应用",
            "/en-US": "app",
          },
          icon: "Edit",
        },
      },
      {
        path: "/dataservice/api-list",
        name: "ApiList",
        component: () => import("@/views/Dataservice/ApiList/index.vue"),
        meta: {
          title: {
            "/zh-CN": "api管理",
            "/en-US": "api",
          },
          icon: "Edit",
        },
      },
    ],
  },
  {
    path: "/chart",
    component: layout,
    redirect: "/chart/echarts",
    meta: {
      title: {
        "/zh-CN": "图表",
        "/en-US": "chart",
      },
      icon: "Document",
    },
    children: [
      {
        path: "/chart/echarts",
        name: "Echarst",
        component: () => import("@/views/Chart/Echarts/index.vue"),
        meta: {
          title: {
            "/zh-CN": "Echarts",
            "/en-US": "Echarts",
          },
          icon: "Edit",
        },
      },
      // {
      //   path: "/chart/screen/demo1",
      //   name: "Demo1",
      //   component: () => import("@/views/Chart/BigScreen/Demo1/index.vue"),
      //   meta: {
      //     title: {
      //       "/zh-CN": "大屏-地图",
      //       "/en-US": "Demo1",
      //     },
      //     icon: "Edit",
      //   },
      // },
    ],
  },
  {
    path: "/chart/screen/demo1",
    name: "Demo1",
    component: () => import("@/views/Chart/BigScreen/Demo1/index.vue"),
    meta: {
      title: {
        "/zh-CN": "大屏-地图",
        "/en-US": "Demo1",
      },
      icon: "Edit",
    },
  },
];

// 此路由必须有，且追加在最后，否则会报错 匹配不到路由
export const notFoundPage = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/noFound",
    meta: {
      title: {
        "/zh-CN": "未找到",
        "/en-US": "NOT FOUND",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
];
