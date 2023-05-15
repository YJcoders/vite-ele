import { defineStore } from "pinia";
import type { userType } from "./types";
export default defineStore("userPermisssion", {
  state: () => ({
    userInfo: {} as userType,
  }),
  // persist: true,
  actions: {
    async getUserInfo() {
      const userInfo = await new Promise((resolve) => {
        this.userInfo = { name: "zs" };
        resolve({ name: "zs" });
      });
      return userInfo;
    },
  },
});
