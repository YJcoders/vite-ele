import type { Directive, VNode } from "vue";
// import { nextTick } from "vue";

// table内文本超长，显示tooltip，否则不显示
const setData = function (el: Element, binding: any, vnode: VNode) {
  // nextTick(() => {
  // const style = document.defaultView?.getComputedStyle(el);
  // if (!style?.height) return;
  // const height = style?.height.split("px")[0];
  // console.log(el, style.height, this.$refs.tooltip);
  // if (Number(height) > 32) {
  //   binding.value.isSetWrap(binding.value.id, true);
  // }
  // console.log(el);
  // 判断文本长度
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, 1);
  const rangeWidth = range.getBoundingClientRect().width;
  // console.log(rangeWidth, "rangeWidth");
  const cell = el.parentElement as Element;
  const style = document?.defaultView?.getComputedStyle(cell);
  if (style?.padding) {
    const left = style?.paddingLeft.replace(/px/g, "") || 0;
    const right = style?.paddingRight.replace(/px/g, "") || 0;
    const sum = Number(left) + Number(right) + rangeWidth;
    console.log(sum);
    if (sum > 150) {
      el.addEventListener("mouseenter", () => {
        console.log(2222);
      });
    }
  }

  // const text = el.innerHTML;
  // console.log(text, 99);
  // const cellChild = el.querySelector(".cell");
  // console.log(vnode, "cellChild");

  // });
};
// const tableTooltip:Directive("tooltip", {
//   bind(el, binding) {
//     // el为绑定的元素，binding为绑定给指令的对象
//     setData(el, binding);
//   },
//   update(el, binding) {
//     // el为绑定的元素，binding为绑定给指令的对象
//     setData(el, binding);
//   },
// });
const tableTooltip: Directive = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    setData(el, binding, vnode);
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {
    setData(el, binding, vnode);
  },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};

export default tableTooltip;
