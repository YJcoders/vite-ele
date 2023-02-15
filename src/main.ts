import { createApp } from "vue";
import type { Directive } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
import Responsive from "./utils/flexible.js";
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./styles/index.less";
import App from "./App.vue";
import router from "./router";
import axios from "@/api";
import directives from "@/directives";
import dayjs from "dayjs";
const app = createApp(App);

// 注册全局指令
Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key as keyof typeof directives]);
});

Responsive.init();
app.config.globalProperties.$axios = axios;
app.config.globalProperties.day = dayjs;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(createPinia().use(piniaPluginPersist));
// app.use(ElementPlus);
app.mount("#app");
