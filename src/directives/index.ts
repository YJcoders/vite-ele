import type { Directive, App, VNode } from "vue";
import { nextTick } from "vue";
import tableTooltip from "./tableTooltip";

/***
 * 使用方式  v-loadMore="{ className: 'popper-load',func: loadMore, gap: 150  }"
 * @param className  必填
 * @param func  必填
 * @param gap  非必填
 *
 */
const loadMore: Directive = {
  mounted(el, binding) {
    // console.log(binding.value);
    const { className, gap, func } = binding.value;
    if (!className) return;
    // 下拉框dom不在el内部  需要通过popper-class属性获取
    const dropdownDom = document.querySelector(
      `.${className} .el-select-dropdown__wrap`
    ) as HTMLElement;
    // console.log(dropdownDom, "dropdownDom");
    if (dropdownDom) {
      const loadEvent = () => {
        const { scrollHeight, scrollTop, clientHeight } = dropdownDom;
        const buff = gap || gap == 0 ? gap : 150;
        // console.log(buff, scrollHeight, scrollTop, clientHeight);
        const isBottom =
          scrollHeight <= Math.ceil(scrollTop + clientHeight) + buff;
        // console.log(isBottom, "isBottom");
        if (isBottom) {
          func();
        }
      };
      el.loadEvent = loadEvent;
      el.dropdownDom = dropdownDom;
      el.dropdownDom.addEventListener("scroll", el.loadEvent);
    }
  },
  beforeUnmount(el) {
    if (el.dropdownDom) {
      el.dropdownDom.removeEventListener("scroll", el.loadEvent);
      delete el.loadEvent;
      delete el.dropdownDom;
    }
  },
};

export default {
  loadMore,
  tableTooltip,
};
