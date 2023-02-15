import { defineStore } from "pinia";

export default defineStore("appPermisssion", {
  state: () => ({
    activeMenu: "/home",

    isCollapse: false,
  }),
  actions: {
    setMenu(value: string) {
      this.activeMenu = value;
    },
    setFold(value: boolean) {
      this.isCollapse = value;
    },
  },
});
