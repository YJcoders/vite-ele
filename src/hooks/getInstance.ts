import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
export default function getInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return { proxy };
}
