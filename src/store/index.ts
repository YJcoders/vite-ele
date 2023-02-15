import usePermissionStore from "./modules/permission";
import useUserStore from "./modules/user";
import useAppStore from "./modules/app";

// 统一导出useStore方法
export default function useStore() {
  return {
    menuPermission: usePermissionStore(),
    userPermisssion: useUserStore(),
    appPermisssion: useAppStore(),
  };
}
