import { debounce } from "@/utils";

interface screenSizeType {
  L: number;
  XL: number;
  XXL: number;
  XXXL: number;
}
interface fontSizeType {
  L: number;
  XL: number;
  XXL: number;
  XXXL: number;
}
const Responsive = {
  responseEnabled: false,
  defaultFontSize: 16,
  eventCallbacks: [] as any,
  screenSize: {
    L: 1440,
    XL: 1680,
    XXL: 1920,
    XXXL: 2560,
  },
  fontSize: {
    L: 12,
    XL: 15,
    XXL: 16,
    XXXL: 20,
  },
  getSize: function (width: number) {
    if (width <= this.screenSize.L) {
      return "L";
    } else if (width <= this.screenSize.XL) {
      return "XL";
    } else if (width <= this.screenSize.XXL) {
      return "XXL";
    } else if (width <= this.screenSize.XXXL) {
      return "XXXL";
    } else {
      return "XXXL";
    }
  },
  setScreenSize: function (value: screenSizeType) {
    this.screenSize = Object.assign(this.screenSize, value);
  },
  setFontSize: function (value: fontSizeType) {
    this.fontSize = Object.assign(this.fontSize, value);
  },
  removeEvent: function (fn: Function) {
    this.eventCallbacks = this.eventCallbacks.filter(function (
      callback: Function
    ) {
      return callback !== fn;
    });
  },
  clearEvent: function () {
    this.eventCallbacks = [];
  },
  // 监听断点变化，组件需要根据断点变化处理业务时非常有用
  addFontSizeChangeEvent: function (callback: Function) {
    if (this.responseEnabled && typeof callback === "function") {
      this.eventCallbacks.push(callback);
    }
  },
  isTouchScreen: function () {
    return /(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);
  },
  getWindowWidth: function () {
    try {
      return window.top?.innerWidth || window.innerWidth;
    } catch (error) {
      // alert("应用地址和平台地址不统一，请联系管理员重新配置！");
      return window.innerWidth;
    }
  },
  resetHtmlFontSize: function () {
    const currentWidth = this.getWindowWidth();
    const size = this.getSize(parseInt(String(currentWidth)));
    const documentEl = window.document.documentElement;
    const oldFontSize = parseInt(documentEl.style.fontSize);

    if (this.fontSize[size] !== oldFontSize) {
      documentEl.style.fontSize = this.fontSize[size] + "px";
      this.eventCallbacks.forEach(function (fn: Function) {
        fn(size);
      });
    }
  },
  init: function () {
    if (arguments.length && arguments[0] !== undefined) {
      this.screenSize = arguments[0].screenSize;
      this.fontSize = arguments[0].fontSize;
    }

    if (this.isTouchScreen()) {
      // 移动不执行响应
      return;
    } else {
      if (this.fontSize) {
        // 重置font-size
        this.setFontSize(this.fontSize);
      }

      if (this.screenSize) {
        // 重置屏幕断点
        this.setScreenSize(this.screenSize);
      } // 初始化 html font-size

      this.resetHtmlFontSize();
      const setFontSize = debounce(this.resetHtmlFontSize, 300);
      window.addEventListener("resize", function () {
        setFontSize.call(Responsive);
      });
      window.addEventListener("beforeunload", () => {
        this.clearEvent.call(Responsive);

        this.responseEnabled = false;
      });
    }

    this.responseEnabled = true;
  },
};

export default Responsive;
